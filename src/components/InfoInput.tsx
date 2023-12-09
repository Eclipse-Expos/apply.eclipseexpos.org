import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Input from "./Input";
import { LoadingRelative } from "./Loading";

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
  const [data, setData] = useState<Data>({
    email: "",
    phone: "",
    name: "",
  });

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 p-4">
      <Image
        src="/images/logo-white.png"
        width={700}
        height={700}
        alt={"..."}
      />

      {status === Status.DEFAULT && (
        <Inputs
          updateData={(key: string, value: string) =>
            setData({ ...data, [key]: value })
          }
          onSubscribe={async () => {
            setStatus(Status.LOADING);
            const success = await addUserToDatabase(data);
            setStatus(success ? Status.SUCCESS : Status.DEFAULT);
          }}
        />
      )}

      {status === Status.SUCCESS && <SuccessMessage />}
      {status === Status.LOADING && <LoadingRelative className="mt-10" />}
    </div>
  );
}

/**
 * Inputs Component
 * @param props The props to pass to the component
 * @returns JSX.Element
 */
interface InputsProps {
  updateData: (key: string, value: string) => void;
  onSubscribe: () => Promise<void>;
}
function Inputs(props: InputsProps): JSX.Element {
  return (
    <>
      <Input
        className="w-72 sm:w-[32rem]"
        placeholder="Name"
        onChange={(value) => props.updateData("name", value)}
      />
      <Input
        className="w-72 sm:w-[32rem]"
        placeholder="Email"
        onChange={(value) => props.updateData("email", value)}
      />
      <Input
        className="w-72 sm:w-[32rem]"
        placeholder="Phone"
        onChange={(value) => props.updateData("phone", value)}
      />
      <button
        onClick={async () => await props.onSubscribe()}
        className="w-72 border border-white bg-white px-2 py-3 text-sm tracking-wider text-slate-900 outline-2 outline-white duration-300 ease-in-out hover:border-white hover:bg-black hover:text-white hover:outline-white disabled:opacity-50 sm:w-[32rem]"
      >
        Subscribe
      </button>
    </>
  );
}

/**
 * Data to send to the server
 * @param data The data to send to the server
 */
interface Data {
  email: string;
  phone: string;
  name: string;
}
async function addUserToDatabase(data: Data) {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    body: JSON.stringify(data),
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
      <h1 className="text-4xl font-black tracking-wide text-white">
        Thanks for subscribing!
      </h1>
      <p className="mt-1 text-white">Let&#39;s break some records.</p>
    </div>
  );
}
