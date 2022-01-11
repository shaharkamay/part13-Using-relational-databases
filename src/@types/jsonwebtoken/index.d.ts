import { User } from '../user';

declare global {
  namespace Jsonwebtoken {
    interface JwtPayload {
      user: User;
    }
  }
}
