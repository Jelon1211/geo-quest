import {
  IGetUser,
  ICreateUser,
  ILoginUser,
  ICreateUserResponse,
  IGetUserResponse,
} from "../types/loginservice";

export default class LoginService {
  static async loginAuth(userData: ILoginUser): Promise<IGetUserResponse> {
    try {
      const response = await fetch(
        `https://8dac-91-235-160-56.ngrok-free.app/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: IGetUser = await response.json();
      return { data, status: response.status };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "An unexpected error occurred.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  }

  static async createUser(userData: ICreateUser): Promise<ICreateUserResponse> {
    try {
      const response = await fetch(
        `https://8dac-91-235-160-56.ngrok-free.app/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data: ICreateUser = await response.json();
      return { data, status: response.status };
    } catch (error) {
      throw error;
    }
  }

  static async logOut(): Promise<Response> {
    try {
      const response = await fetch(`https://www.citi-games.pl/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
}
