import { z } from 'zod';
import { ListResponse, Response } from '../shared/shared';
import { errorMessages } from '../messages';

export const v_user = z.object({
  id: z.number(errorMessages),
  deviceID: z.number(errorMessages),
  premium: z.boolean(),
});

export type TUser = z.infer<typeof v_user>;
export type R_User = Response<TUser>;
export type R_Login = Response<{
  user: TUser;
}>;

export type ListUsers = ListResponse<TUser>;
