import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

// temporary use this secret key
const ADMIN_JWT_SECRETKEY = 'Dotdotdot2020320900';
// encode or decode password
export const md5Decode = (pwd: string | Buffer | DataView) => {
  return crypto
    .createHash('md5')
    .update(pwd)
    .digest('hex');
};

// use jwt to create token
export function createToken(params: { username: string }) {
  const token = jwt.sign({ ...params }, ADMIN_JWT_SECRETKEY, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3,
    issuer: 'XuJiazhen',
  });
  return token;
}
