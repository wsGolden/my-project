
export const BaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:7001"
    : "http://101.43.185.170:7001";
/**
 * 获取参数
 */
export const getSearchParam = (key, search = window.location.search) => {
  const searchParams = new URLSearchParams(search);
  return searchParams.get(key) || "";
};

export const getImage = (data) => {
  const arr = [];
  data?.split(",").forEach((v, i) => {
    arr.push({
      uid: String(i),
      name: v,
      status: "done",
      url: `${BaseUrl}/upload/${v}`,
      response: {
        flag: 1,
        data: v,
      },
    });
  });
  return arr;
};

export const getImageIds = (data) => {
  const arr = []
  data?.forEach((v) => {
    if (v?.response?.flag === 1) {
      return arr.push(v?.response?.data)
    }
  })
  return arr.join(',')
}