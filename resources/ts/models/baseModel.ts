import { HTTPPromise, HTTPRequestConfig, Model } from "vue-api-query";

export default class BaseModel extends Model {
  baseURL(): string {
    return "/api";
  }

  request(config: HTTPRequestConfig): HTTPPromise {
    return this.$http.request(config);
  }
}
