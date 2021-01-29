import http from "../util/http";

export function getCode(phone) {
  return http.post("/user/code", { phone });
}
