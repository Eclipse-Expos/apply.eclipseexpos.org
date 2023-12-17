"use client";

import { useState } from "react";
import { LoadingRelative } from "@/components/Loading";
import Input from "@/components/Input";

// Status of the input
enum Status {
  DEFAULT,
  LOADING,
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
            placeholder="Name"
            onChange={(value) => setName(value)}
          />
          <Input
            type="email"
            className="w-72 sm:w-[32rem]"
            placeholder="Email"
            onChange={(value) => setEmail(value)}
          />
          <button
            onClick={async () => {
              setStatus(Status.LOADING);

              const success = await addUserToDatabase(email, name);
              setStatus(success ? Status.SUCCESS : Status.DEFAULT);
            }}
            className="w-72 border-2 border-primary bg-primary px-2 py-3 text-sm tracking-wider text-slate-900 outline-2 outline-primary duration-300 ease-in-out hover:border-primary hover:bg-background hover:text-primary hover:outline-primary disabled:opacity-50 sm:w-[32rem]"
          >
            Subscribe
          </button>
        </>
      )}

      {status === Status.SUCCESS && <SuccessMessage />}
      {status === Status.LOADING && <LoadingRelative className="mt-10" />}
    </div>
  );
}

/**
 * Data to send to the server
 * @param email Email
 * @param name Name
 */
async function addUserToDatabase(email: string, name: string) {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    body: JSON.stringify({
      email,
      name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  return json && json.success;
}

/**
 * Success Message
 * @returns JSX.Element
 */
function SuccessMessage(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-2 tracking-wide">
      <h1 className="text-4xl font-black tracking-wide text-primary">
        Thanks for subscribing!
      </h1>
      <p className="mt-1 text-primary">Let&#39;s break some records.</p>
    </div>
  );
}
