/** ajax */
import axios, { axiosPost } from "@/common/utils/axios";

export const getArticleDetail = (params: { _id: string }) => {
  return axiosPost("/api/article/detail", params);
};

