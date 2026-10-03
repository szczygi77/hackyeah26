import { customAlphabet } from "nanoid";

const nano = customAlphabet("23456789ABCDEFGHJKLMNPQRSTUVWXYZ", 8);

export function publicSubmissionId() {
  return `SZ-${nano()}`;
}
