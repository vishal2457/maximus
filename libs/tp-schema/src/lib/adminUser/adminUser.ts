import { z } from "zod";
import { errorMessages, errorMessages as messages } from "../messages";
import { Response } from "../shared/shared";

export const v_admin_user = z.object({
  id: z.number(errorMessages),
  email: z
    .string(errorMessages)
    .email()
    .transform((val) => val.trim()),
  password: z.string(errorMessages).transform((val) => val.trim()),
  passwordChangedOn: z
    .optional(z.string(errorMessages))
    .transform((val: string = "") => val.trim()),
  roleId: z.number(errorMessages),
  active: z.boolean(errorMessages),
});

export const v_update_user = v_admin_user.pick({
  email: true,
  roleId: true,
  active: true,
});

export const v_adminlogin = v_admin_user
  .pick({
    email: true,
    password: true,
  })
  .strict()
  .required();

export const v_admin_change_password = z
  .object({
    oldPassword: z.string({
      required_error: messages.required_error,
    }),
    newPassword: z.string({
      required_error: messages.required_error,
    }),
    confirmPassword: z.string({
      required_error: messages.required_error,
    }),
  })
  .required()
  .strict();

export type t_admin_user = z.infer<typeof v_admin_user>;
export type t_update_user = z.infer<typeof v_update_user>;
export type t_adminlogin = z.infer<typeof v_adminlogin>;
export type v_admin_change_password = z.infer<typeof v_admin_change_password>;
export type R_AdminLogin = Response<{ token: string; data: t_admin_user }>;
