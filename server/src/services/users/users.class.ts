import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import crypto from 'crypto';
import { Params } from '@feathersjs/feathers';

const gravatarUrl = 'https://s.gravatar.com/avatar';

// Returns the Gravatar image for an email
const getGravatar = (email: string) => {
  const hash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');

  // Return the full avatar URL
  return `${gravatarUrl}/${hash}`;
};

interface UserData {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  create(data: UserData, params?: Params) {
    // This is the information we want from the user signup data
    const { email, password, firstName, lastName } = data;
    // Use the existing avatar image or return the Gravatar for the email
    const avatar = data.avatar || getGravatar(email);
    // The complete user
    const userData = {
      email,
      firstName,
      lastName,
      password,
      avatar,
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }
}
