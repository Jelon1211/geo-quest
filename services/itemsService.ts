import {
  IApiConfig,
  ICreateItem,
  IItem,
  IUpdateItem,
} from "@/types/itemservice";
import axios, { AxiosInstance, AxiosResponse } from "axios";

class ItemsService {
  private axiosInstance: AxiosInstance;
  private authorizationToken?: string;
  private appToken: string;

  constructor(config: IApiConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
    });

    this.appToken =
      process.env.EXPO_PUBLIC_BACKEND_X_APP_BEARER || config.appToken;

    this.axiosInstance.interceptors.request.use((config) => {
      if (this.authorizationToken) {
        config.headers["Authorization"] = `Bearer ${this.authorizationToken}`;
      }
      config.headers["X-App-Token"] = `Bearer ${this.appToken}`;
      return config;
    });
  }

  public setAuthorizationToken(token: string): void {
    this.authorizationToken = token;
  }

  private async request<T>(
    method: "GET" | "POST" | "PATCH" | "DELETE",
    url: string,
    params?: any,
    data?: any
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request<T>({
        method,
        url,
        params,
        data,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  }

  public async getItems(
    skip: number = 0,
    limit: number = 100,
    order: number = 1,
    sort: string = "id"
  ): Promise<any> {
    const params = { skip, limit, order, sort };
    return this.request<any>("GET", "open/items", params);
  }

  public async getItemById(itemId: string): Promise<any> {
    return this.request<any>("GET", `open/items/${itemId}`);
  }

  public async createItem(itemData: ICreateItem): Promise<any> {
    return this.request<any>("POST", "/items", {}, itemData);
  }

  public async updateItem(itemId: string, itemData: IUpdateItem): Promise<any> {
    return this.request<any>("PATCH", `/items/${itemId}`, {}, itemData);
  }

  public async deleteItem(itemId: string): Promise<any> {
    return this.request<any>("DELETE", `/items/${itemId}`);
  }
}

export default ItemsService;
