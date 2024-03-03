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
import { FormEvent, useEffect, useRef, useState } from "react";
import { Result, formSubmit } from "./formSubmit";

export default function Marketing() {
  const [status, setStatus] = useState<InputStatus>(InputStatus.DEFAULT);
  const [errors, setErrors] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

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

  return (
    <>
      <StarBackground />

      <main className="flex h-screen w-screen flex-col items-center overflow-y-auto overflow-x-hidden py-24">
        <div>
          <EclipseLogoTextOrbGlow className="z-10 h-24 sm:h-40" />
        </div>
        <form
          className="relative flex h-fit flex-col justify-center gap-4 p-4 px-8 md:px-4"
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
              <div className="flex w-full flex-row gap-4  sm:flex-col">
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
                className="w-full"
                required={true}
                placeholder="Email*"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex w-full flex-row items-center gap-4 sm:flex-col">
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
                className="w-full "
                required={true}
                placeholder="School/Institution*"
                name="institution"
              />

              <p className="mt-16 text-lg font-bold text-primary">Your Work</p>

              {/* Using media queries to enable flex is kinda scuffed 
              but using them to switch flex directions doesn't seem to be working */}
              <div className="md:flex md:items-center md:gap-4">
                <p className="text-primary md:w-1/4">Resume*</p>
                <FileInput
                  type="file"
                  className="w-full"
                  required={true}
                  name="resume"
                  accept="application/pdf, image/*"
                />
              </div>
              <div className="md:flex md:items-center md:gap-4">
                <p className="text-primary md:w-1/4">Portfolio</p>
                <FileInput
                  type="file"
                  className="w-full"
                  name="portfolio"
                  accept="application/pdf, image/*"
                />
              </div>

              <p className="mt-16 text-lg font-bold text-primary">About You</p>

              <p className="mt-4 w-full text-primary  ">
                About You (2 sentences)*
              </p>

              <TextArea
                className="w-full "
                required={true}
                name="aboutAnswer"
                maxLength={255}
              />

              <p className="mt-4 w-full text-primary  ">
                If you could break any world record, what would it be?{" "}
                <span className="whitespace-nowrap">(1 sentence)</span>*
              </p>

              <TextArea
                className="w-full "
                required={true}
                placeholder=""
                name="recordAnswer"
                maxLength={255}
              />
              <Button className="w-full ">Submit</Button>
              <p className="w-full text-primary  ">* Required fields</p>
            </>
          )}

          {/**
           * If the input is loading, then show the loading spinner
           */}
          {status === InputStatus.LOADING && (
            <LoadingSpinner className="mt-10" />
          )}

          {errors.map((error) => (
            <Notification
              key={error}
              open={true}
              className="mt-4"
              type="error"
              message={error}
              onClose={() => {
                setErrors((prevErrors) =>
                  prevErrors.filter((e) => e !== error),
                );
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
      </main>
    </>
  );
}
