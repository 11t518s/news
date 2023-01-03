export interface BasicAsyncReduxState<T> {
  isLoading: boolean;
  data: T;
  error: string;
}
