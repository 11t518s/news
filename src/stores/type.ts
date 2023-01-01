import { AxiosError } from "axios";

export interface BasicReduxState<T> {
  isLoading: boolean;
  data: T | null;
  error: AxiosError | null;
}
