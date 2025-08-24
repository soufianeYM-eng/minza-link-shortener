import crypto from 'crypto';
export const generateShortUid = (id: string, longUrl: string) => {
  const data = `${id}-${longUrl}-${Date.now()}-${Math.random()}`;
  const hash = crypto.createHash('sha256').update(data).digest('hex');

  return hash.slice(0, 10);
};
