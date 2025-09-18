import crypto from "crypto";

const UNSUBSCRIBE_SECRET = process.env.UNSUBSCRIBE_SECRET!;

export function createUnsubscribeToken(email: string) {
  if (!email) throw new Error("Email is required");

  // Create a deterministic token from email + secret
  const token = crypto
    .createHash("sha256")
    .update(email + UNSUBSCRIBE_SECRET)
    .digest("hex");

  return token;
}
