export interface IPermissionMessage {
  permissionDenied: boolean;
  errorMessage: string | null;
}
export interface IEmptyState {
  title: string;
  subtitle: string;
}

export interface IInfoBox {
  title: string;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
}
