import axios from "axios";

export const api = axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "6af3ef2e3bmsh638aac4d2990866p152bbcjsn18653a7f2192",
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
  },
});
