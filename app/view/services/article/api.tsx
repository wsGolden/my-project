/** ajax */
import axios, { axiosPost } from "@/common/utils/axios";

export const addArticle = (params: {
  articleTitle: string;
  articleDes: string;
  articleContent: string;
}) => {
  return axiosPost("/api/article/add", params);
};

export const removeArticle = (params: { _id: string }) => {
  return axiosPost("/api/article/remove", params);
};

export const getArticleDetail = (params: { _id: string }) => {
  return axiosPost("/api/article/detail", params);
};

export const updateArticle = (params: {
  _id: string;
  articleTitle: string;
  articleDes: string;
  articleContent: string;
  articlePicId: string;
}) => {
  return axiosPost("/api/article/update", params);
};

export default { updateArticle };
