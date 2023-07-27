/** ajax */
import axios, { axiosPost } from "@/common/utils/axios";

export const getArticleList = () => {
  return axiosPost("/api/article/list", {});
};



export default { getArticleList };
