import { ERROR_TYPE } from "../types/types";

/**
 * Error type to error code map
 */
export const ERROR_TYPE_TO_ERROR_CODE_MAP: Record<ERROR_TYPE, number> = {
  [ERROR_TYPE.INVALID_REQUEST]: 400,
  [ERROR_TYPE.INVALID_RESPONSE]: 500,
  [ERROR_TYPE.NOT_FOUND]: 404,
  [ERROR_TYPE.UNAUTHORIZED]: 401,
  [ERROR_TYPE.INTERNAL_SERVER_ERROR]: 500,
};

/**
 * Transform error type to error code
 *
 * @param {ERROR_TYPE} input - Error type to transform
 * @returns {number} - Transformed error code
 */
export const transformERROR_TYPEToErrorCode = (input: ERROR_TYPE): number => {
  return ERROR_TYPE_TO_ERROR_CODE_MAP[input];
};

/**
 * Error type to default error message map
 */
export const ERROR_TYPE_TO_DEFAULT_ERROR_MESSAGE_MAP: Record<
  ERROR_TYPE,
  string
> = {
  [ERROR_TYPE.INVALID_REQUEST]: "Invalid request",
  [ERROR_TYPE.INVALID_RESPONSE]: "Invalid response",
  [ERROR_TYPE.NOT_FOUND]: "Not found",
  [ERROR_TYPE.UNAUTHORIZED]: "Unauthorized",
  [ERROR_TYPE.INTERNAL_SERVER_ERROR]: "Internal server error",
};

/**
 * Transform error type to default error message
 *
 * @param {ERROR_TYPE} errorType - Error type to transform
 * @returns {string} - Transformed error message
 */
export const transformERROR_TYPEToDefaultErrorMessage = (
  input: ERROR_TYPE,
): string => {
  return ERROR_TYPE_TO_DEFAULT_ERROR_MESSAGE_MAP[input];
};
