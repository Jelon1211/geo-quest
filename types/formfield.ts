export interface IFormField {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export interface SignInFormState {
  email: string;
  password: string;
}
export interface SignUpFormState {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
}

export interface ICreateForm {
  title: string;
  image?: any;
  description: string;
  itemType: string;
  location: {
    latitude: number | null;
    longitude: number | null;
  };
}
