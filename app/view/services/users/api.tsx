/** ajax */
import axios, { axiosPost } from "../../common/utils/axios";

export const addUser = (params: { userName: string; nickName: string }) => {
  return axiosPost("/api/user/add", params);
};

export const removeUser = (params: { _id: string }) => {
  return axiosPost("/api/user/remove", params);
};

export const getUserDetail = (params: { _id: string }) => {
  return axiosPost("/api/user/detail", params);
};

export const updateUser = (params: {
  _id: string;
  userName: string;
  nickName: string;
}) => {
  return axiosPost("/api/user/update", params);
};

export default { updateUser };
