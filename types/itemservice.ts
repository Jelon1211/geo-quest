export interface IApiConfig {
  baseURL: string;
  timeout?: number;
}

export interface IItem {
  created_at: string;
  uuid: string;
  title: string;
  description: string;
  status: "open" | "closed";
  level: "active" | "inactive";
  item_type: string;
  owner: string;
  lon: number;
  lat: number;
  md_text: string;
  created_by: string;
  geo: string;
  is_deleted?: boolean;
}
export interface ICreateItem {
  created_by: string;
  title: string;
  description: string;
  item_type: string;
  owner: string;
  lon: number | null;
  lat: number | null;
  uuid?: string;
}

export interface IUpdateItem {
  title: string;
  description: string;
}
