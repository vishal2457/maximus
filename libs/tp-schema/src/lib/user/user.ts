import { z } from 'zod';
import { ListResponse, Response } from '../shared/shared';
import { errorMessages } from '../messages';

export const v_user = z.object({
  id: z.number(errorMessages).describe('sequelize=primary,unique'),
  userName: z.string(errorMessages).min(1),
  email: z.string(errorMessages).describe('sequelize=unique'),
  password: z.string(errorMessages),
  device: z
    .enum(['ios', 'android'])
    .describe('sequelize=defaultValue:ios;form=select'),
});

export type TUser = z.infer<typeof v_user>;
export type R_User = Response<TUser>;
export type R_Login = Response<{
  user: TUser;
}>;

export type ListUsers = ListResponse<TUser>;
