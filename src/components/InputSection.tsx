"use client";

import { useState } from "react";
import { LoadingRelative } from "@/components/Loading";
import Input from "@/components/Input";
import SuccessMessage from "@/components/SuccessMessage";
import ErrorMessage from "@/components/ErrorMessage";
import Button from "./Button";
import { trpc } from "@/app/_trpc/client";
import { set } from "zod";

// Status of the input
enum Status {
  DEFAULT, // Inputs
  LOADING, // Shows loading components.
  ERROR, // Requires inputs. Shows error message at bottom.
  SUCCESS, // Shows success message
  ALREADY_REGISTERED, // Requires inputs. Shows error message at bottom.
  EMPTY_FIELDS, // Requires inputs. Shows error message at bottom.
}

/**
 * Info Input Component
 * @returns JSX.Element
 */
export default function InfoInput() {
  const [status, setStatus] = useState<Status>(Status.DEFAULT);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const register = trpc.register.useMutation();

  /**
   * When the user clicks the register button
   * @returns void
   */
  const onRegister = async (): Promise<void> => {
    setStatus(Status.LOADING);

    // Check if the user has filled out all fields
    if (!email || !name) {
      setStatus(Status.EMPTY_FIELDS);
      return;
    }

    try {
      const user = await register.mutateAsync({
        email,
        name,
      });

      // If the user is null, then the email is already registered
      if (user === null) {
        setStatus(Status.ALREADY_REGISTERED);
        return;
      }

      setStatus(Status.SUCCESS);
    } catch {
      setStatus(Status.ERROR);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onRegister();
      }}
      className="relative flex flex-col items-center justify-center gap-4 p-4"
    >
      {status !== Status.SUCCESS && status !== Status.LOADING && (
        <>
          <Input
            type="text"
            className="w-72 sm:w-[32rem]"
            required={true}
            placeholder="Name"
            onChange={(value: string) => setName(value)}
          />
          <Input
            type="email"
            className="w-72 sm:w-[32rem]"
            required={true}
            placeholder="Email"
            onChange={(value: string) => setEmail(value)}
          />
          <Button className="w-72 sm:w-[32rem]">Pre-register</Button>
        </>
      )}

      {status === Status.ERROR && (
        <ErrorMessage>
          An error has occurred. Please try again with a different email.
        </ErrorMessage>
      )}
      {status === Status.ALREADY_REGISTERED && (
        <ErrorMessage>
          You are already registered! Check your email for more information.
        </ErrorMessage>
      )}
      {status === Status.EMPTY_FIELDS && (
        <ErrorMessage>Please fill out all fields.</ErrorMessage>
      )}
      {status === Status.SUCCESS && <SuccessMessage />}
      {status === Status.LOADING && <LoadingRelative className="mt-10" />}
    </form>
  );
}
