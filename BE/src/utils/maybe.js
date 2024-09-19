export const maybe = async (fn) => {
  try {
    const { data } = await fn();
    const final = [null, data];
    return final;
  } catch (err) {
    const final = [err, null];
    return final;
  }
};
