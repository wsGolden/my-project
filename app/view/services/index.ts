/** ajax */
import axios, { axiosPost } from "@/common/utils/axios";

export const getConfig = () => {
  return axiosPost("/api/getconfig", {});
};

