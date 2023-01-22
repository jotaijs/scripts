import { red, dim } from 'colorette';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function handleError(error: unknown) {
  if (isError(error)) {
    console.error(red(error.message));
    if (error.stack) {
      console.error(dim(error.stack));
    }
  } else {
    console.error(red(String(error)));
  }
  process.exitCode = 1;
}
