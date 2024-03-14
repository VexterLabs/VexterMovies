import { IncomingMessage } from "http";
import { ipReg } from "@/utils/other";

export const getSource = (req: IncomingMessage): string => {
  let source = '';
  try {
    if (req.headers && req.headers?.['x-forwarded-for'] && ipReg.test((req.headers['x-forwarded-for'] || '') as string)) {
      source = (req?.headers?.['x-forwarded-for'] || '') as string;
    } else if (req.socket && req.socket['_peername'] && req.socket?.['_peername']?.address && ipReg.test(req.socket?.['_peername']?.address || '')) {
      source = (req.socket?.['_peername']?.address || '') as string;
    }
  } catch (e) {}
  return source;
}
