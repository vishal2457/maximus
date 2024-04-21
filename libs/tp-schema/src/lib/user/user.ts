import { z } from "zod";
import { ListResponse, Response } from "../shared/shared";
import { errorMessages } from "../messages";
import { qs } from "../_util";

export const v_user = z.object({
  id: z.number(errorMessages).describe(
    qs({
      sequelize: { primary: true, unique: true },
      form: { skip: true },
    })
  ),
  userName: z.string(errorMessages).min(1),
  email: z.string(errorMessages).describe(qs({ sequelize: { unique: true } })),
  password: z.string(errorMessages).describe(qs({ form: { skip: true } })),
  device: z
    .enum(["ios", "android"])
    .describe(
      qs({ sequelize: { defaultValue: "ios" }, form: { type: "select" } })
    ),
});

export type TUser = z.infer<typeof v_user>;
export type R_User = Response<TUser>;
export type R_Login = Response<{
  user: TUser;
}>;

export type ListUsers = ListResponse<TUser>;
