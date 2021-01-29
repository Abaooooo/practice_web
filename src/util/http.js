function http(options) {
  let { url, method = "get", data = {} } = options,
    obj = {
      method,
    };
  let str = ``;
  Object.keys(data).forEach((item) => {
    str += `&${item}=${data[item]}`;
  });
  str = str.substring(1);
  if (/get/i.test(obj.method)) {
    url = url.includes("?") ? url + str : url + "?" + str;
  } else {
    obj.body = str;
    obj.headers = {
      "content-type": "application/x-www-form-urlencoded",
    };
  }
  return fetch(url, obj).then((data) => data.json());
}

http.get = function(url, data) {
  return http({ url, method: "get", data });
};
http.post = function(url, data) {
  return http({ url, method: "post", data });
};

export default http;
