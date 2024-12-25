"use client";

import { useRouter } from "next/navigation";

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
import { loginWithCredentialsAction } from "../actions/auth-actions";

export const EmailPasswordForm = () => {
  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // change function to handle-action
  async function onSubmit(values: SignInSchema) {
    try {
      const isAutenticated = await loginWithCredentialsAction(
        values.email,
        values.password
      );
      if (!isAutenticated.success) return;
      // TODO: al realizar la redireccion no se estan cargando los datos del logeo
      // se puede utlizar el comodin de window.location.replace("/"); ya que asi se recarga la pagina, pero no es buena practica usar eso
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  autoComplete="email"
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
                  autoComplete="current-password"
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
            Iniciar sesión
          </Button>

          {/* Boton de crear cuenta */}
          <Button
            className="w-full"
            variant="outline"
            type="button"
            onClick={() => router.push("/auth/new-user")}
          >
            Crear una cuenta
          </Button>
        </div>
      </form>
    </Form>
  );
};
