"use server";

import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { prisma } from "@/prisma";

type ActionResponse<T = void> = {
  ok: boolean;
  data?: T;
  error?: string;
};

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  roleId: string | null;
}

export const loginWithCredentialsAction = async (
  email: string,
  password: string
): Promise<ActionResponse> => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "Credenciales inválidas",
    };
  }
};

export const createUserAction = async (
  formData: FormData
): Promise<ActionResponse<UserResponse>> => {
  const data = Object.fromEntries(formData) as unknown as CreateUserData;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return {
        ok: false,
        error: "El email ya está registrado",
      };
    }

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

    return {
      ok: true,
      data: {
        ...newUser,
        name: newUser.name ?? "no-name",
      },
    };
  } catch (error) {
    console.error("[Create User Error]:", error);
    return {
      ok: false,
      error: "Error al crear el usuario",
    };
  }
};

export const assignRoleAction = async (
  userId: string,
  roleId: string
): Promise<ActionResponse> => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        roleId,
      },
    });
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};
