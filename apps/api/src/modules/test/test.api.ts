import { Router } from "express";
import ah from "../../core/utils/async-handler.util";
import { Test } from "./models/test.model";
import { validate } from "../../core/middlewares/validation.middleware";
import { v_param_id, v_user } from "tp-schema";
import { success } from "proses-response";

const TestRouter = Router();

TestRouter
.post(
  "/",
  validate({ body: v_user.omit({ id: true }) }),
  ah(async (req, res) => {
    const result = await Test.create(req.body);
    success(res, result, "Test added");
  })
)
.put(
    '/:id',
    validate({ body: v_user.omit({ id: true }), params: v_param_id }),
    ah(async (req, res) => {
      const result = await Test.update(req.body, {
        where: { id: req.params.id },
      });
      success(res, result, 'Test updated');
    })
  )
  .get(
  '/list',
  ModelOptions.build(),
  ah(async (req, res) => {
    const result = await Test.findAndCountAll(req.modelOptions);
    success(res, result, 'Test List');
  })
)
.delete(
  "/:id",
  validate({ params: v_param_id }),
  ah(async (req, res) => {
    const result = await Test.destroy({ where: { id: req.params.id } });
    success(res, result, "Delete success");
  })
)

export default TestRouter;
