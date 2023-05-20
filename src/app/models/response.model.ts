export interface ResponseModel<T> {
  errors: any;
  response: T;
  data: T;
  message: string;
}
