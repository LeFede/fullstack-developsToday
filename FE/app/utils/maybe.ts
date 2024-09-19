export const maybe = async <T>(fn: () => Promise<{ data: T }>) => {
  try {
    const { data } = await fn();
    const final = [null, data];
    return final;
  } catch (err) {
    const final = [err, null];
    return final;
  }
};
