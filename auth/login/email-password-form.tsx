"use client";

import { redirect } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { SignInSchema, signInSchema } from "../schemas/auth-schemas";

export const EmailPasswordForm = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: SignInSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ values });
  }
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electronico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ingrese su email"
                    {...field}
                  />
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
          <Button className="w-full" type="submit">
            Iniciar sesión
          </Button>

          {/* Boton de crear cuenta */}
          <Button
            className="w-full"
            variant="outline"
            type="button"
            onClick={() => {
              redirect("/auth/register");
            }}
          >
            Crear una cuenta
          </Button>
        </form>
      </Form>
    </div>
  );
};
