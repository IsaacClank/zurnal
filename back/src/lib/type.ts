export interface PlainObject {
  [key: string]: any;
}

export interface ErrorObject {
  error: string;
  detail?: Error;
  status: number;
}

export const isErrorObject = (arg: any): arg is ErrorObject =>
  typeof arg.status === 'number' && typeof arg.error === 'string';
