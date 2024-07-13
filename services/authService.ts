import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authKit = process.env.EXPO_PUBLIC_AUTH_KIT || ``;
const authenticateUrl = process.env.EXPO_PUBLIC_AUTHENTICATE || ``;

export class AuthService {
  static async initiateAuthSession() {
    const redirect = AuthSession.makeRedirectUri({
      path: "auth/callback",
    }).toString();
    let url = authKit;
    let result = await WebBrowser.openAuthSessionAsync(url, redirect);
    return result;
  }

  static async exchangeCodeForToken(code: string) {
    try {
      const response = await axios.post(authenticateUrl, {
        client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_API_URL,
        grant_type: "authorization_code",
        code: code,
      });

      const data = response.data;

      if (response.status === 200) {
        await AsyncStorage.setItem("refresh_token", data.refresh_token);
        return data;
      } else {
        throw new Error(data.error || "Failed to exchange code for token");
      }
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      throw error;
    }
  }

  static async refreshAuthSession(refresh_token: string) {
    try {
      const response = await axios.post(authenticateUrl, {
        client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_API_URL,
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      });

      const data = response.data;

      if (response.status === 200) {
        await AsyncStorage.setItem("refresh_token", data.refresh_token);
        return data;
      } else {
        throw new Error(data.error || "Failed to exchange code for token");
      }
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      throw error;
    }
  }

  static async registerUser(access_token: string) {
    console.log(access_token);
    try {
      const response = await axios.post(
        `https://citi-games.pl/users`,
        {},
        {
          headers: {
            "X-App-token": "Bearer 1Gu93Rh^3bU5Umn3%9Du@5HWy23f@1!gR%ys",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = response.data;

      console.log(response);
      console.log(data);
    } catch (error) {
      console.error("error test", error.data);
      throw error;
    }
  }
}
