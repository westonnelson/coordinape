import { z } from 'zod';

import { createForm } from './createForm';
import {
  zEthAddress,
  zBooleanToNumber,
  identityTransform,
} from './formHelpers';

import { IUser, ICircle } from 'types';

interface IUserAndCircle {
  user?: IUser;
  circle: ICircle;
}

const schema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long.'),
    address: zEthAddress,
    non_giver: zBooleanToNumber,
    fixed_non_receiver: zBooleanToNumber,
    role: zBooleanToNumber,
    starting_tokens: z.number(),
  })
  .strict();

const AdminUserForm = createForm(
  () => schema,
  identityTransform
)({
  name: 'adminUser',
  getInstanceKey: (v: IUserAndCircle) => (v?.user ? String(v?.user.id) : `new`),
  load: (v: IUserAndCircle) => ({
    name: v.user?.name ?? '',
    address: v.user?.address ?? '',
    non_giver: !!(v.user?.non_giver ?? !v.circle.default_opt_in),
    fixed_non_receiver: !!v.user?.fixed_non_receiver ?? false,
    role: !!v.user?.role ?? false,
    starting_tokens: v.user?.starting_tokens ?? 100,
  }),
  fieldProps: {},
});

export default AdminUserForm;
