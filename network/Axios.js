const axios = require("axios");
const ExternalDependencyError = require("../errors/ExternalDependencyError");
const logger = require("../logger");

module.exports = class HttpService {
  constructor(baseUrl) {
    this.axios = axios;
    this.baseUrl = baseUrl;
    this.timeout = 20000;
    this.__error = {
      message: "could not successfully complete request to an external server",
      useAsDefault: true,
    };
  }

  get requestInstance() {
    axios.default.get;
    const instance = this.axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: this.headers,
    });
    instance.interceptors.request.use((config) => {
      const { url, method, baseUrl, data } = config;
      console.log(
        `HTTPService: ${method.toUpperCase()} ==> ${baseUrl}${url} >>> [DATA]: `,
        data
      );
      return config;
    });
    return instance;
  }

  setHeader(headers) {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  setAuthHeader(authData) {
    this.setHeader({ Authorization: authData });
    return this;
  }

  setBasicAuth({ username, password }) {
    const TOKEN = Buffer.from(username + ":" + password).toString("base64");
    this.setAuthHeader("Basic " + TOKEN);
    return this;
  }

  onError(errorMsgOrFunction) {
    if (typeof errorMsgOrFunction == "function")
      this.__error.handler = errorMsgOrFunction;
    else this.__error.message = errorMsgOrFunction;
    return this;
  }

  async get(url, options) {
    return await this._handleRequest(this.requestInstance.get(url, options));
  }

  async post(url, data, options) {
    return await this._handleRequest(
      this.requestInstance.post(url, data, options)
    );
  }

  async update(url, data, options) {
    return await this._handleRequest(
      this.requestInstance.put(url, data, options)
    );
  }

  async delete(url, options) {
    return await this._handleRequest(this.requestInstance.delete(url, options));
  }

  async _handleRequest(requestPromise) {
    try {
      const response = await Promise.resolve(requestPromise);
      return response.data;
    } catch (e) {
      logger.error("error making nexwork request");
      logger.error(e);
      let message = this.__error.message;
      if (e.response) {
        if (e.isAxiosError && this.__error.useAsDefault) {
          message = e.response?.message ?? message;
        }
      }
      if (process.env.ENVIRONMENT == "test") return null;
      throw new ExternalDependencyError(500, message);
    }
  }
};
