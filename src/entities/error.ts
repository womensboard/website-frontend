export type ErorrType<T> = Partial<Record<keyof T, string | string[]>>;
export type ApiError<T> = {
  message: string;
  errors: ErorrType<T>;
};

export type HTTPResponseType<T = object, ResData = any> =
  | {
      data: null;
      errors: Partial<Record<keyof T, string | string[]>>;
      statusCode: number;
    }
  | {
      data: ResData | null;
      errors: null;
      statusCode: number;
    };

export type SubmitHandler<Input, ResData = any> = (
  values: Input
) => Promise<HTTPResponseType<Input, ResData> | undefined>;

export type FormHandlerReturnType = 'error' | void;
