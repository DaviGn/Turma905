import crypto from 'crypto';

interface CryptData {
  hash: string;
  salt: string;
}
export function crypt(password: string): CryptData {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return { hash: hash, salt: salt };
}
