const { authJwt } = require("../functions");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/normalPage", controller.normalPage);
  
  app.get("/api/loginedPage", [authJwt.verifyToken], controller.loginedPage);

};
