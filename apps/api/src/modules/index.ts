import { Application } from "express";
import AdminUserRouter from "./adminUser/adminUser.api";
import Session from "../core/middlewares/jwt.middleware";

const moduleWrapper = (app: Application) => {
  app.use("/admin-user", AdminUserRouter).use(Session.secure);
  // APPEND API ROUTES
};

export default moduleWrapper;
