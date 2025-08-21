import { compare, hash } from 'bcrypt';

export const comparePassword = (
  raw: string,
  hashed: string,
): Promise<boolean> => {
  return compare(raw, hashed);
};

export const hashPassword = (raw: string) => {
  const saltRounds = 10;
  return hash(raw, saltRounds);
};
