const { env: original } = process;

const env = {
  PORT: original.PORT,

  API_COUNTRIES: original.API_COUNTRIES,
  API_BORDERS: original.API_BORDERS,
  API_POPULATION: original.API_POPULATION,
  API_FLAGS: original.API_FLAGS,
};

const validatreEnv = (key, value) => {
  if (value == null) {
    throw new Error(`${key} is missing in .env`);
  }
};

Object.entries(env).forEach(([key, value]) => {
  validatreEnv(key, value);
});

export { env };
