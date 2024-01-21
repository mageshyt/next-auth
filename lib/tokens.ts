import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import crypto from "crypto";
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date();
  //   add 1 hour to the current time
  expires.setHours(expires.getHours() + 1);
  const existingToken = await getVerificationTokenByEmail(email);
  // if there is an existing token, remove it
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  //   create a new token
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date();
  //   add 1 hour to the current time
  expires.setHours(expires.getHours() + 1);
  const existingToken = await getPasswordResetTokenByEmail(email);
  // if there is an existing token, remove it
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  //   create a new token
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 999_999).toString();
  const expires = new Date();
  // add 1 hour to the current time
  expires.setHours(expires.getHours() + 1);
  const existingToken = await db.twoFactorToken.findFirst({
    where: {
      email,
    },
  });
  // if there is an existing token, remove it
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  //  create a new token
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
