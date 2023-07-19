import Cookies from "js-cookie";
import { EnumTokens, IAuthResponse, ITokens } from "@/types/user.types";

export const StorageService = {
  getAccessToken() {
    const accessToken = Cookies.get(EnumTokens.AccessToken);
    return accessToken || null;
  },

  getRefreshToken() {
    const refreshToken = Cookies.get(EnumTokens.RefreshToken);
    return refreshToken || null;
  },

  saveTokensStorage(data: ITokens) {
    Cookies.set(EnumTokens.AccessToken, data.accessToken);
    Cookies.set(EnumTokens.RefreshToken, data.refreshToken);
  },

  getUserFromStorage() {
    return JSON.parse(localStorage.getItem("user") || "{}");
  },

  saveToStorage(data: IAuthResponse) {
    this.saveTokensStorage(data);
    localStorage.setItem("user", JSON.stringify(data.user));
  },

  removeFromStorage() {
    Cookies.remove(EnumTokens.AccessToken);
    Cookies.remove(EnumTokens.RefreshToken);
    localStorage.removeItem("user");
  },
};
