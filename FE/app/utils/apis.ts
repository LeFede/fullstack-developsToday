import axios from "axios";
import { env } from "../env";

export const localApi = axios.create({
  baseURL: `${env.BACK_URL}:${env.BACK_PORT}`,
});
