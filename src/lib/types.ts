export interface User {
  name: string;
  email: string;
  secret: string;
}

export enum Status {
  DEFAULT, // Inputs
  LOADING, // Shows loading components.
  ERROR, // Requires inputs. Shows error message at bottom.
  SUCCESS, // Shows success message
  ALREADY_REGISTERED, // Requires inputs. Shows error message at bottom.
  EMPTY_FIELDS, // Requires inputs. Shows error message at bottom.
}
