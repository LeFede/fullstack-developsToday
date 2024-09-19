const { env: original } = process;

type EnvEntries = Record<string, string | undefined>;

const env: EnvEntries = {
  BACK_URL: original.BACK_URL,
  BACK_PORT: original.BACK_PORT,
};

const validateEnv = (key: keyof EnvEntries, value: string | undefined) => {
  if (value == null) {
    throw new Error(`${key} is missing in .env`);
  }
};

(Object.entries(env) as [keyof EnvEntries, string | undefined][]).forEach(
  ([key, value]) => {
    validateEnv(key, value);
  },
);

export { env };
