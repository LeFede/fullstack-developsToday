import axios from "axios";
import { env } from "../env.js";

export const api_countries = axios.create({
  baseURL: env.API_COUNTRIES,
});

export const api_borders = axios.create({
  baseURL: env.API_BORDERS,
});

export const api_population = axios.create({
  baseURL: env.API_POPULATION,
});

export const api_flags = axios.create({
  baseURL: env.API_FLAGS,
});
