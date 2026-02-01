export type TResult<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};
