"use client";

import { useState } from "react";
import { LoadingRelative } from "@/components/Loading";
import Input from "@/components/Input";
import { base64encode } from "@/lib/crypto";
import SuccessMessage from "@/components/SuccessMessage";
import ErrorMessage from "@/components/ErrorMessage";
import Button from "./Button";

// Status of the input
enum Status {
  DEFAULT, // Inputs
  LOADING, // Shows loading components.
  ERROR, // Requires inputs. Shows error message at bottom.
  SUCCESS, // Shows success message
  ALREADY_SUBSCRIBED, // Requires inputs. Shows error message at bottom.
  EMPTY_FIELDS, // Requires inputs. Shows error message at bottom.
}

/**
 * Info Input Component
 * @returns JSX.Element
 */
export default function InfoInput(): JSX.Element {
  const [status, setStatus] = useState<Status>(Status.DEFAULT);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

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
    const userExists = await userAlreadyExists(email);
    if (userExists) {
      setStatus(Status.ALREADY_SUBSCRIBED);
      return;
    }

    // Add the user to the database
    const success = await addUserToDatabase(email, name);
    setStatus(success ? Status.SUCCESS : Status.ERROR);
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 p-4">
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
          <Button
            className="w-72 sm:w-[32rem]"
            onClick={async () => await onSubscribe()}
          >
            Subscribe
          </Button>
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
    </div>
  );
}

/**
 * Add the user to the database via the API
 * @param email Email
 * @param name Name
 * @returns boolean
 */
async function addUserToDatabase(email: string, name: string) {
  // Request headers
  const headers = {
    "Content-Type": "application/json",
  };

  // Request body
  const body = JSON.stringify({
    email,
    name,
  });

  return await fetch("api/subscribe", {
    method: "POST",
    headers,
    body,
  })
    .then((res) => res.json())
    .then((json) => json.success);
}

/**
 * Fetch the user from the database via email. This is done
 * to check if they are already in the database.
 * @param email Email
 * @returns boolean
 */
async function userAlreadyExists(email: string) {
  const id = base64encode(email); // Encode the email

  // Request headers
  const headers = {
    "Content-Type": "application/json",
  };

  // If the response is ok, return true - this is because
  // the user is then already in the database
  return await fetch(`/api/users/${id}`, {
    method: "GET",
    headers,
  }).then((res) => res.ok);
}
