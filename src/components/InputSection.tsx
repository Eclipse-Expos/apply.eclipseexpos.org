"use client";

import { api } from "@/utils/api";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import Button from "@/components/Button";
import Input from "@/components/Input";
import SuccessMessage from "@/components/SuccessMessage";
import { LoadingRelative } from "@/components/Loading";
import { Status } from "@/lib/types";

/**
 * Info Input Component
 * @returns JSX.Element
 */
export default function InfoInput(): JSX.Element {
  const [status, setStatus] = useState<Status>(Status.DEFAULT);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  // Add the user to the database (subscribe)
  const { mutate } = api.subscribe.post.useMutation();

  // Get the user from the db
  const { refetch } = api.users.get.useQuery(
    {
      email,
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  /**
   * When the user clicks the subscribe button
   * @returns void
   */
  const onSubscribe = async (): Promise<void> => {
    setStatus(Status.LOADING);

    // Check if the user has filled out all fields
    if (!email || !name) {
      setStatus(Status.EMPTY_FIELDS);
      return;
    }

    // Check if the user already exists
    const { data: userData } = await refetch();
    if (userData?.success) {
      setStatus(Status.ALREADY_SUBSCRIBED);
      return;
    }

    // Add the user to the database then Update the status depending
    // on the mutation success
    mutate(
      {
        email,
        name,
      },
      {
        onSuccess: (data) => {
          setStatus(data.success ? Status.SUCCESS : Status.ERROR);
        },
        onError: () => {
          setStatus(Status.ERROR);
        },
      },
    );
  };

  return (
    <form
      className="relative flex flex-col items-center justify-center gap-4 p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubscribe();
      }}
    >
      {status !== Status.SUCCESS && status !== Status.LOADING && (
        <>
          <Input
            type="text"
            className="w-72 sm:w-[32rem]"
            required={true}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            className="w-72 sm:w-[32rem]"
            required={true}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="w-72 sm:w-[32rem]">Subscribe</Button>
        </>
      )}

      {status === Status.ERROR && (
        <ErrorMessage>
          An error has occurred. Please try again with a different email.
        </ErrorMessage>
      )}
      {status === Status.ALREADY_SUBSCRIBED && (
        <ErrorMessage>
          You are already subscribed! Check your email for more information.
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
