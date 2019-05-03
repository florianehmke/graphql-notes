import { isDefined } from './objects';

export interface ClientError {
  code: string;
  message: string;
}

export function extractClientErrors(response): ClientError[] {
  if (response.errors && response.errors.length) {
    return response.errors
      .filter(error => !!error.extensions)
      .map(error => error.extensions)
      .filter(ext => isDefined(ext.code) && isDefined(ext.message));
  }
}
