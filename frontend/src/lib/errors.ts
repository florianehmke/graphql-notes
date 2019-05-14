export interface ClientError {
  code: string;
  message: string;
}

export function handleErrors(response): boolean {
  const clientErrors: ClientError[] = [];
  const serverErrors = [];
  if (response.errors && response.errors.length) {
    response.errors.forEach(error => {
      if (error.extensions) {
        clientErrors.push(error.extensions);
      } else {
        serverErrors.push(error);
      }
    });
  }

  if (clientErrors.length > 0) {
    console.warn('Client Error(s) ocurred:');
    clientErrors.forEach(err => console.warn(err));
  }

  if (serverErrors.length > 0) {
    console.error('Server Error(s) ocurred:');
    serverErrors.forEach(err => console.error(err));
  }

  return clientErrors.length === 0 && serverErrors.length === 0;
}
