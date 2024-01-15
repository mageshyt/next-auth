import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10); // 10 is the number of rounds
  const hash = await bcrypt.hash(password, salt);

  return hash;
};
