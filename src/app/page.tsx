"use client";

import { InputStatus } from "@/types/types";
import { useState, FormEvent, useEffect } from "react";
import { trpc } from "./_trpc/client";
import {
  TextField,
  Button,
  StarBackground,
  LoadingSpinner,
  Notification,
  MainWrapper,
  EclipseLogoTextOrbGlow,
} from "eclipse-components";
import { getSessionUser } from "@/lib/user/getSessionUser";
import { set } from "zod";

export default function Home() {
  return (
    <>
      <StarBackground />

      <MainWrapper>
        <EclipseLogoTextOrbGlow />
        <Components />
      </MainWrapper>
    </>
  );
}

/**
 * Home Page Components
 *
 * @returns JSX.Element
 */
function Components(): JSX.Element {
  /**
   * States
   */
  const [status, setStatus] = useState<InputStatus>(InputStatus.DEFAULT);
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  /**
   * tRPC Mutation for registering a user
   */
  const register = trpc.register.useMutation();

  /**
   * When the user clicks the register button
   *
   * @returns void
   */
  const onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    /**
     * Set the status of the input to loading
     *
     * This will show the loading spinner
     */
    setStatus(InputStatus.LOADING);

    /**
     * If the email or name is empty, then set the status to empty fields.
     *
     * This will show an error message to the user
     */
    if (!email || !firstName || !lastName) {
      setStatus(InputStatus.EMPTY_FIELDS);
      return;
    }

    /**
     * Try to register the user
     */
    try {
      /**
       * If the user is already registered, then the user will be null
       */
      const user = await register.mutateAsync({
        email,
        firstName,
        lastName,
      });

      /**
       * If the user is null, then set the status to already registered
       */
      if (user === null) {
        return setStatus(InputStatus.ALREADY_REGISTERED);
      }

      /**
       * If the user is not null, then set the status to success
       */
      setStatus(InputStatus.SUCCESS);
    } catch {
      /**
       * If an error occurs, then set the status to error
       */
      setStatus(InputStatus.ERROR);
    }
  };

  useEffect(() => {
    getSessionUser().then((user) => {
      console.log(user);
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
      className="relative flex flex-col items-center justify-center gap-4 p-4"
      onSubmit={onSubmit}
    >
      {/**
       * If the status is not success or loading, then show the input fields
       */}
      {status !== InputStatus.SUCCESS && status !== InputStatus.LOADING && (
        <>
          <div className="flex w-72 flex-row gap-4 sm:w-[32rem] sm:flex-col">
            <TextField
              type="text"
              className="w-full"
              required={true}
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              type="text"
              className="w-full"
              required={true}
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <TextField
            type="email"
            className="w-72 sm:w-[32rem]"
            required={true}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="w-72 sm:w-[32rem]">Pre-register</Button>
        </>
      )}

      {/**
       * If the input is loading, then show the loading spinner
       */}
      {status === InputStatus.LOADING && <LoadingSpinner className="mt-10" />}

      {/**
       * If an error occurs, then show the error message
       */}
      <Notification
        open={status === InputStatus.ERROR}
        message="An error has occurred. Please try again with a different email."
        onClose={() => setStatus(InputStatus.DEFAULT)}
      />

      {/**
       * If the user is already registered, then show the error message
       */}
      <Notification
        open={status === InputStatus.ALREADY_REGISTERED}
        message="You are already registered! Check your email for more information."
        onClose={() => setStatus(InputStatus.DEFAULT)}
      />

      {/**
       * If the user hasn't filled out all the fields, then show the error message
       */}
      <Notification
        open={status === InputStatus.EMPTY_FIELDS}
        message="Please fill out all fields"
        onClose={() => setStatus(InputStatus.DEFAULT)}
      />

      {/**
       * If the user has successfully registered, then show the success message
       */}
      {status === InputStatus.SUCCESS && (
        <div className="flex flex-col items-center justify-center gap-2 tracking-wide">
          <h1 className="text-4xl font-black tracking-wide text-primary">
            Thanks for registering!
          </h1>
          <p className="mt-1 text-primary">Let&#39;s break some records.</p>
        </div>
      )}
    </form>
  );
}
