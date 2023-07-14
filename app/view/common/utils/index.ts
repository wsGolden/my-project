/**
 * 获取参数
 */
export const getSearchParam = (key, search = window.location.search) => {
  const searchParams = new URLSearchParams(search);
  return searchParams.get(key) || "";
};
