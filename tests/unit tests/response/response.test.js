const Response = require("../../../response/response");

test("test for properties present in the ServerResponse class", () => {
  const response = new Response();
  expect(response.respond).toBeDefined();
  expect(typeof response.respond).toBe("function");
  expect(response.setData).toBeDefined();
  expect(typeof response.setData).toBe("function");
  expect(response.setErrorMessages).toBeDefined();
  expect(typeof response.setErrorMessages).toBe("function");
  expect(response.setMessage).toBeDefined();
  expect(typeof response.setMessage).toBe("function");
  expect(response.setStatusCode).toBeDefined();
  expect(typeof response.setStatusCode).toBe("function");
  expect(response.setSuccess).toBeDefined();
  expect(typeof response.setSuccess).toBe("function");
});
