"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { registerSchema, RegisterSchema } from "../schemas/auth-schemas";

import {
  createUserAction,
  loginWithCredentialsAction,
} from "../actions/auth-actions";
import { signIn } from "next-auth/react";

export const CreateUserForm = () => {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // change function to handle-action
  async function onSubmit(values: RegisterSchema) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("name", values.name);
    try {
      const newUser = await createUserAction(formData);
      if (!newUser.data) return;
      await signIn("credentials", {
        email: newUser.data.email,
        password: values.password,
        redirectTo: "/",
      });
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Name new user */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ingrese su nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electronico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Ingrese su email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Boton de inicio de sesion */}
        <div className="space-y-4">
          <Button className="w-full" type="submit">
            Crear cuenta
          </Button>

          {/* Boton de crear cuenta */}
          <Button
            className="w-full"
            variant="outline"
            type="button"
            onClick={() => router.push("/auth/login")}
          >
            Ya tengo una cuenta
          </Button>
        </div>
      </form>
    </Form>
  );
};
