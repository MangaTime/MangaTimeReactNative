export const wait = (duration: number): Promise<void> =>
  new Promise((res) => setTimeout(res, duration));
