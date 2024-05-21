export interface JoinFormData {
  name: string;
  loginId: string;
  email: string;
  emailCertification: number;
  password: string;
  checkPassword?: string;
}

export interface LoginFormData {
  loginId: string;
  password: string;
}

export interface UpdateFormData {
  name: string;
  profileImage: any;
  position: string;
  explanation: string;
  token: string;
}
