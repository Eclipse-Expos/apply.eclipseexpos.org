/**
 * User interface
 */
export interface User {
  /**
   * The user's name.
   */
  name: string;
  /**
   * The user's email.
   */
  email: string;
  /**
   * The user's password.
   */
  secret: string;
}

/**
 * Input status
 */
export enum InputStatus {
  /**
   * The input is in its default state.
   */
  DEFAULT,
  /**
   * Loading the user registration.
   *
   * Show a loading spinner.
   */
  LOADING,
  /**
   * An error has occurred.
   *
   * Show an error message at the bottom of the form.
   */
  ERROR,
  /**
   * The user has successfully registered.
   *
   * Show a success message at the bottom of the form.
   */
  SUCCESS,
  /**
   * The user has already registered.
   *
   * Show an error message at the bottom of the form.
   */
  ALREADY_REGISTERED,
  /**
   * The user has not filled out all inputs.
   *
   * Show an error message at the bottom of the form.
   */
  EMPTY_FIELDS,
}
