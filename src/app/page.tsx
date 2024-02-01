import MainWrapper from "@/components/MainWrapper";
import StarBackground from "@/components/StarBackground";
import EclipseLogoSVG from "@/components/svgs/EclipseLogo";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import InputField from "@/components/InputField";
import { LoadingRelative } from "@/components/Loading";
import SuccessMessage from "@/components/SuccessMessage";
import { InputStatus } from "@/types/types";
import { useState, FormEvent } from "react";
import { trpc } from "./_trpc/client";

/**
 * Home Page
 *
 * @returns JSX.Element
 */
export default function Home() {
  return (
    <>
      <StarBackground />

      <MainWrapper>
        <EclipseLogoSVG />
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
  const [name, setName] = useState<string>("");

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
    if (!email || !name) {
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
        name,
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
          <InputField
            type="text"
            className="w-72 sm:w-[32rem]"
            required={true}
            placeholder="Name"
            onChange={(value: string) => setName(value)}
          />
          <InputField
            type="email"
            className="w-72 sm:w-[32rem]"
            required={true}
            placeholder="Email"
            onChange={(value: string) => setEmail(value)}
          />
          <Button className="w-72 sm:w-[32rem]">Pre-register</Button>
        </>
      )}

      {/**
       * If the input is loading, then show the loading spinner
       */}
      {status === InputStatus.LOADING && <LoadingRelative className="mt-10" />}

      {/**
       * If an error occurs, then show the error message
       */}
      {status === InputStatus.ERROR && (
        <ErrorMessage>
          An error has occurred. Please try again with a different email.
        </ErrorMessage>
      )}

      {/**
       * If the user is already registered, then show the error message
       */}
      {status === InputStatus.ALREADY_REGISTERED && (
        <ErrorMessage>
          You are already registered! Check your email for more information.
        </ErrorMessage>
      )}

      {/**
       * If the user hasn't filled out all the fields, then show the error message
       */}
      {status === InputStatus.EMPTY_FIELDS && (
        <ErrorMessage>Please fill out all fields.</ErrorMessage>
      )}

      {/**
       * If the user has successfully registered, then show the success message
       */}
      {status === InputStatus.SUCCESS && <SuccessMessage />}
    </form>
  );
}
