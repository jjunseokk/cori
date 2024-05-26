export interface AddPostData {
  title: string;
  content: string;
  selectOption: string;
  thumbnail: File;
}

export interface UpdateViewData {
  postId: number;
}