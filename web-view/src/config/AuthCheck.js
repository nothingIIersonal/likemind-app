import axios from "axios";
import Cookies from "js-cookie";
import { ProfileURL } from "./APIUrls.js";

export function GetAccessToken() {
  return Cookies.get("access_token");
}

export async function AuthCheck() {
  const authHeaders = {
    Authorization: GetAccessToken(),
  };
  return axios({ method: "post", url: ProfileURL, headers: authHeaders });
}
