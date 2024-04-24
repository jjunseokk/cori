import { JoinFormData, LoginFormData } from "@/type/userType";
import AxiosConfig from "./AxiosConfig";

// 회원가입
const showJoin = (user: JoinFormData) => {
  return AxiosConfig.post("/users", user).then((res) => res);
};

// 로그인
const showLogin = (user: LoginFormData) => {
  return AxiosConfig.post("/users/login", user).then((res) => res);
};

const getUser = (Token : string) => {
  return AxiosConfig.get("/users", {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  }).then((res) => res);
};

export { showJoin, showLogin, getUser };
