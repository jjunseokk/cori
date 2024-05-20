import { JoinFormData, LoginFormData, UpdateFormData } from "@/type/userType";
import AxiosConfig from "./AxiosConfig";

// 회원가입
const showJoin = (user: JoinFormData) => {
  return AxiosConfig.post("/users", user).then((res) => res);
};

// 로그인
const showLogin = (user: LoginFormData) => {
  return AxiosConfig.post("/users/login", user).then((res) => res);
};

// 유저 조회
const getUser = (Token: string) => {
  return AxiosConfig.get("/users/getProfile", {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  }).then((res) => res);
};

// 프로필 업데이트
const updateProfile = (profile: UpdateFormData) => {
  console.log(profile)
  const formData = new FormData();
  if (profile.profileImage) {
    formData.append("image", profile.profileImage);
  }
  formData.append("name", profile.name);
  formData.append("explanation", profile.explanation);
  formData.append("position", profile.position);
  
  return AxiosConfig.post("/users/updateProfile", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${profile.token}`,
    },
  });
};

export { showJoin, showLogin, getUser, updateProfile };
