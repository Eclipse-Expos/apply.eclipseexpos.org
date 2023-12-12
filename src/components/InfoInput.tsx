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
            className="w-72 sm:w-[32rem]"
            placeholder="Name"
            onChange={(value) => setName(value)}
          />
          <Input
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
            className="hover:bg-background border-primary bg-primary outline-primary hover:border-primary hover:text-primary hover:outline-primary w-72 border-2 px-2 py-3 text-sm tracking-wider text-slate-900 outline-2 duration-300 ease-in-out disabled:opacity-50 sm:w-[32rem]"
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
      <h1 className="text-primary text-4xl font-black tracking-wide">
        Thanks for subscribing!
      </h1>
      <p className="text-primary mt-1">Let&#39;s break some records.</p>
    </div>
  );
}
