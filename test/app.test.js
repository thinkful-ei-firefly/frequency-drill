const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");

describe("app", () => {
  it("should return 400 status on no query", () => {
    return request(app)
      .get("/frequency")
      .expect(400)
      .expect("Invalid request");
  });
  it("should return an object with valid keys", () => {
    return request(app)
      .get("/frequency")
      .query({ s: "absbsd" })
      .expect(200)
      .then(res => {
        expect(res.body).to.include.all.keys("count", "average", "highest");
      });
  });
  it("should return an object with valid values provided input regardless of case", () => {
    return request(app)
      .get("/frequency")
      .query({ s: "AaaBb" })
      .expect(200)
      .then(res => {
        expect(res.body).to.eql({
          count: 2,
          average: 2.5,
          highest: "a",
          a: 3,
          b: 2
        });
      });
  });
  it("on tie for highest frequency return the one closest to the beginning of the alphabet.", () => {
    return request(app)
      .get("/frequency")
      .query({ s: "bbbAAA" })
      .expect(200)
      .then(res => {
        expect(res.body).to.eql({
          count: 2,
          average: 3,
          highest: "a",
          a: 3,
          b: 3
        });
      });
  });
});
