import http from "../util/http";

export async function getCode(phone) {
  let time = await fetch("/user/code", {
    method: "post",
    body: `phone=${phone}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  }).then((data) => data.headers.get("date"));
  return time;
}

export function checkCode({ phone, code }) {
  return http.post("/user/checkCode", { phone, code });
}

export function checkPhone(phone) {
  return http.post("/user/phone", { phone });
}

export function register({ name, phone, passord, passordPay }) {
  return http.post("/user/register", { name, phone, passord, passordPay });
}

export function login({ account, password, type }) {
  return http.post("/user/login", { account, password, type });
}

export function signout() {
  return http.get("/user/signout");
}
