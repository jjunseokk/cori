import { AddPostData, UpdateViewData } from "@/type/postType";
import AxiosConfig from "./AxiosConfig";

// 글쓰기
const addPost = (postData: AddPostData, Token: string) => {
  return AxiosConfig.post("/posts/writePost", postData, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};

// 글 가져오기
const showPostList = (page: string) => {
  return AxiosConfig.get(`/posts/getPost?page=${page}`);
};

// Hot 조회수
const showTop10 = (page: string) => {
  return AxiosConfig.get(`/posts/getTop10?page=${page}`);
};

// 조회수 올리기
const updateView = (view: UpdateViewData) => {
  return AxiosConfig.patch(`/posts/updateView`, view);
};

export { addPost, showPostList, updateView, showTop10 };
