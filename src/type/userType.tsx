export interface JoinFormData {
  name: string;
  email: string;
  password: string;
  checkPassword?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface UpdateFormData {
  name: string;
  profileImage: any;
  position: string;
  explanation: string;
  token: string;
}
