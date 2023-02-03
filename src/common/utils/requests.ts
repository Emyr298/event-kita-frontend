export const isSuccess = (status: number) => {
  return 200 <= status && status <= 299;
};