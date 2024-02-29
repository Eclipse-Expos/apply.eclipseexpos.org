"use client";

import { trpc } from "@/app/_trpc/client";
import { getSessionUser } from "@/lib/user/getSessionUser";
import { InputStatus } from "@/types/types";
import { stringTitle } from "@/utils/stringTitle";
import {
  TextField,
  Button,
  StarBackground,
  LoadingSpinner,
  Notification,
  MainWrapper,
  EclipseLogoTextOrbGlow,
  DatePicker,
  FileInput,
  TextArea,
} from "eclipse-components";
import { FormEvent, useEffect, useState } from "react";
import { Result, formSubmit } from "./formSubmit";

export default function Marketing() {
  return (
    <>
      <StarBackground />

      <main className="flex h-screen flex-col items-center overflow-y-auto py-24">
        <div>
          <EclipseLogoTextOrbGlow className="z-10 h-24 sm:h-40" />
        </div>
        <Components />
      </main>
    </>
  );
}

/**
 * Home Page Components
 *
 * @returns JSX.Element
 */
function Components(): JSX.Element {
  const [status, setStatus] = useState<InputStatus>(InputStatus.DEFAULT);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const formHandler = (result: Result) => {
    if (result.success) {
      setStatus(InputStatus.SUCCESS);
    } else {
      setStatus(InputStatus.DEFAULT);
      setErrors([result.message]);
    }
  };

  useEffect(() => {
    getSessionUser().then((user) => {
      if (user) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
      }
    });
  }, []);

  /**
   * Return the main form
   */
  return (
    <form
      className="relative flex h-fit flex-col items-center justify-center gap-4 p-4"
      action={async (data) => {
        setStatus(InputStatus.LOADING);
        const result = await formSubmit(data);
        formHandler(result);
      }}
    >
      {/**
       * If the status is not success or loading, then show the input fields
       */}
      {status !== InputStatus.SUCCESS && status !== InputStatus.LOADING && (
        <>
          <p className="text-lg font-bold text-primary">General Details</p>
          <div className="flex w-72 flex-row gap-4 sm:w-[32rem] sm:flex-col">
            <TextField
              type="text"
              className="w-full"
              required={true}
              placeholder="First Name*"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              type="text"
              className="w-full"
              required={true}
              placeholder="Last Name*"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <TextField
            type="email"
            className="w-72 sm:w-[32rem]"
            required={true}
            placeholder="Email*"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex w-72 flex-row items-center gap-4 sm:w-[32rem] sm:flex-col">
            <p className="w-1/4 text-primary">Date of Birth*</p>
            <DatePicker
              type="date"
              className="w-3/4"
              required={true}
              name="dateOfBirth"
            />
          </div>

          <TextField
            type="text"
            className="w-72 sm:w-[32rem]"
            required={true}
            placeholder="School/Institution*"
            name="institution"
          />

          <p className="mt-16 text-lg font-bold text-primary">Your Work</p>

          <div className="flex w-72 flex-row items-center gap-4 sm:w-[32rem] sm:flex-col">
            <p className="w-1/4 text-primary">Resume*</p>
            <FileInput
              type="file"
              className="w-3/4"
              required={true}
              name="resume"
              accept="application/pdf, image/*"
            />
          </div>
          <div className="flex w-72 flex-row items-center gap-4 sm:w-[32rem] sm:flex-col">
            <p className="w-1/4 text-primary">Portfolio</p>
            <FileInput
              type="file"
              className="w-3/4"
              name="portfolio"
              accept="application/pdf, image/*"
            />
          </div>

          <p className="mt-16 text-lg font-bold text-primary">About You</p>

          <p className="mt-4 w-72 text-primary  sm:w-[32rem]">
            About You (2 sentences)*
          </p>

          <TextArea
            className="w-72 sm:w-[32rem]"
            required={true}
            name="aboutAnswer"
          />

          <p className="mt-4 w-72 text-primary  sm:w-[32rem]">
            If you could break any world record, what would it be?{" "}
            <span className="whitespace-nowrap">(1 sentence)</span>*
          </p>

          <TextArea
            className="w-72 sm:w-[32rem]"
            required={true}
            placeholder=""
            name="recordAnswer"
          />
          <Button className="w-72 sm:w-[32rem]">Submit</Button>
          <p className="w-72 text-primary  sm:w-[32rem]">* Required fields</p>
        </>
      )}

      {/**
       * If the input is loading, then show the loading spinner
       */}
      {status === InputStatus.LOADING && <LoadingSpinner className="mt-10" />}

      {errors.map((error) => (
        <Notification
          key={error}
          open={true}
          className="mt-4"
          type="error"
          message={error}
          onClose={() => {
            setErrors((prevErrors) => prevErrors.filter((e) => e !== error));
          }}
        />
      ))}

      {/**
       * If the user has successfully registered, then show the success message
       */}
      {status === InputStatus.SUCCESS && (
        <div className="flex flex-col items-center justify-center gap-2 tracking-wide">
          <h1 className="text-4xl font-black tracking-wide text-primary">
            Thanks for applying!
          </h1>
          <p className="mt-1 text-primary">Let&#39;s break some records.</p>
        </div>
      )}
    </form>
  );
}
