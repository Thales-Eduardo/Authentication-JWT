import User from '../models/Users';

export default {
  render(user: User) {
    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      avatar: user.avatar,
    };
  },
};
