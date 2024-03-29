import { Router } from "express";
import ah from "../../core/utils/async-handler.util";
import { User } from "./models/user.model";
import { validate } from "../../core/middlewares/validation.middleware";
import { v_param_id, v_user } from "tp-schema";
import { success } from "proses-response";

const UserRouter = Router();

UserRouter.post(
  "/",
  validate({ body: v_user.pick({ deviceID: true }) }),
  ah(async (req, res) => {
    const user = await User.create(req.body);
    success(res, user, "User added");
  })
).get(
  "/:id",
  validate({ params: v_param_id }),
  ah(async (req, res) => {
    const user = await User.findOne({ where: { deviceID: req.params.id } });
    success(res, user, "User");
  })
).put("/premium/:userID", ah(async(req, res) => {
  const user = await User.update({premium: true}, {where: {id: req.params.userID}});
  success(req, user, "User upgraded to premium")
}))

export default UserRouter;
