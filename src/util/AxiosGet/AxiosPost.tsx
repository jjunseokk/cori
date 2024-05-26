import { AddPostData, UpdateViewData } from "@/type/postType";
import AxiosConfig from "./AxiosConfig";

// 글쓰기
const addPost = (postData: AddPostData, Token: string) => {
  console.log(postData);
  const formData = new FormData();
  if (postData.thumbnail) {
    formData.append("thumbnail", postData.thumbnail);
  }
  formData.append("title", postData.title);
  formData.append("content", postData.content);
  formData.append("selectOption", postData.selectOption);

  return AxiosConfig.post("/posts/writePost", formData, {
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

const showDetailPost = (id: string[] | string) => {
  return AxiosConfig.get(`/posts/getDetail?id=${id}`);
};

export { addPost, showPostList, updateView, showTop10, showDetailPost };
