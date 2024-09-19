import express from "express";
import { env } from "./env.js";
import { maybe } from "./utils/maybe.js";
import {
  api_countries,
  api_borders,
  api_population,
  api_flags,
} from "./utils/apis.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (_req, res) => {
  const [err, countries] = await maybe(() => api_countries.get(""));
  if (err) return res.status(500).json({ message: err });

  return res.status(200).json(countries);
});

app.get("/:country", async (req, res) => {
  const countryInfo = {};
  const { country } = req.params;

  // Borders
  const [bordersError, bordersData] = await maybe(() =>
    api_borders.get(country),
  );
  if (bordersError) return res.status(400).json({ message: bordersError });
  countryInfo.borders = bordersData.borders;
  countryInfo.name = bordersData.commonName;

  // Population
  const [populationError, populationData] = await maybe(() =>
    api_population.post("", {
      country: bordersData.commonName.toLowerCase(),
    }),
  );
  if (populationError)
    return res.status(400).json({ message: populationError });
  countryInfo.population = populationData.data.populationCounts;

  // Flag
  const [flagError, flagData] = await maybe(() =>
    api_flags.post("", { iso2: bordersData.countryCode }),
  );
  if (flagError) return res.status(400).json({ message: flagError });
  countryInfo.flag = flagData.data.flag;

  return res.status(200).json(countryInfo);
});

app.listen(env.PORT, () => console.log(`🚀 Running on port ${env.PORT}`));
