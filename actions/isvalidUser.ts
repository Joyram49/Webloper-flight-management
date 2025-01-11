"use server";

import { User } from "@/models/userSchema";

export const isValidUser = async (email: string) => {
  const user = await User.findOne({ email });
  if (user) {
    return true;
  } else {
    return false;
  }
};
