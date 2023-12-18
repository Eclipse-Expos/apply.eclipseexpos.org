"use client";

import { useState } from "react";
import { LoadingRelative } from "@/components/Loading";
import Input from "@/components/Input";
import { base64encode } from "@/lib/crypto";
import SuccessMessage from "./SuccessMessage";

// Status of the input
enum Status {
  DEFAULT,
  LOADING,
  ERROR,
  SUCCESS,
}

/**
 * Info Input Component
 * @returns JSX.Element
 */
export default function InfoInput(): JSX.Element {
  const [status, setStatus] = useState<Status>(Status.DEFAULT);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 p-4">
      {status === Status.DEFAULT && (
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
          <button
            onClick={async () => {
              setStatus(Status.LOADING);

              // Check if the user already exists
              const userExists = await userAlreadyExists(email);
              if (userExists) {
                setStatus(Status.ERROR);
                return;
              }

              // Add the user to the database
              const success = await addUserToDatabase(email, name);
              setStatus(success ? Status.SUCCESS : Status.ERROR);
            }}
            className="w-72 border-2 border-primary bg-primary px-2 py-3 text-sm tracking-wider text-slate-900 outline-2 outline-primary duration-300 ease-in-out hover:border-primary hover:bg-background hover:text-primary hover:outline-primary disabled:opacity-50 sm:w-[32rem]"
          >
            Subscribe
          </button>
        </>
      )}

      {status === Status.ERROR && (
        <p className="text-center text-sm text-red-600 lg:text-base">
          An error has occurred. Please try again with a different email.
        </p>
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
