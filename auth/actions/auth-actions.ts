"use server";

import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export const loginWithCredentialsAction = async (
  email: string,
  password: string
) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const createUserAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  try {
    const newUser = await prisma.user.create({
      data: {
        name: data.name as string,
        email: data.email as string,
        password: bcrypt.hashSync(data.password as string),
      },
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
      },
    });

    console.log({ newUser });
    return newUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};
