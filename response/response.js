class ServerResponse {
  #payload = { message: "", data: null, success: true, errMsgs: [] };
  #statusCode = 200;

  respond(res) {
    res.status(this.#statusCode).json(this.#payload);
  }

  setMessage(msg) {
    this.#payload.message = msg;
    return this;
  }

  setStatusCode(code) {
    this.#statusCode = code;
    return this;
  }

  setData(data) {
    this.#payload.data = data;
    return this;
  }

  setSuccess(success) {
    this.#payload.success = success;
    return this;
  }

  setErrorMessages(...msgs) {
    this.#payload.errMsgs = msgs;
    return this;
  }
}

module.exports = ServerResponse;
