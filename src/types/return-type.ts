export type ServerActionResult<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};
