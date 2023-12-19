import { base64encode } from "./crypto";

export class Response {
  static get Success() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      status: 200,
      success: true,
      message: "Success",
      timestamp,
      id,
    };
  }

  static get InvalidQueryParams() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      status: 400,
      success: false,
      message: "Invalid query parameters",
      timestamp,
      id,
    };
  }

  static get InternalError() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      status: 500,
      success: false,
      message: "Internal server error",
      timestamp,
      id,
    };
  }

  static get InvalidInput() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      status: 400,
      success: false,
      message: "Invalid request input",
      timestamp,
      id,
    };
  }

  static get MethodNotAllowed() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      status: 405,
      success: false,
      message: "Method not allowed",
      timestamp,
      id,
    };
  }

  static get NotFound() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      status: 404,
      success: false,
      message: "Not found",
      timestamp,
      id,
    };
  }
}
