/**
 * Auth routes.
 */
module.exports = ({ client, db, logger }) => {
  const express = require("express");
  const router = express.Router();
  const userController = require("../controllers/user.controller")();
  const { authenticate } = require("../middlewares")();
  const { userGet, userCreate } = require("../validators/user.validator");
  const validate = require("express-validation");

  /**
   * User route
   */
  router
    .route("/user")
    .get(validate(userGet), authenticate, (req, res, next) =>
      userController.getUsers(req, res, next, { logger, client, db })
    )
    .post(validate(userCreate), (req, res, next) =>
      userController.createUser(req, res, next, { logger, client, db })
    )
    .put(authenticate, (req, res, next) =>
      userController.updateUser(req, res, next, { logger, client, db })
    )
    .delete(authenticate, (req, res, next) =>
      userController.deleteUser(req, res, next, { logger, client, db })
    );

  return router;
};
