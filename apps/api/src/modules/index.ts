import { Application } from "express";
import AdminUserRouter from "./adminUser/adminUser.api";
import Session from "../core/middlewares/jwt.middleware";

const moduleWrapper = (app: Application) => {
  app
    .use("/admin-user", AdminUserRouter)
    // APPEND API ROUTES
    .use(Session.secure);
};

export default moduleWrapper;
