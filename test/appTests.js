const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

describe("Test GET endpoint /score", () => {
  it("should return player lifetime scores", (done) => {
    chai
      .request(server)
      .get("/score")
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("Test GET endpoint /start ", () => {
    it("should start the game in a child process", (done) => {
        chai
        .request(server)
        .get("/start")
        .send()
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
