"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { assignRoleAction } from "../actions/auth-actions";

const roleSchema = z.object({
  role: z.string().min(1, "Debes seleccionar un rol"),
});

type RoleFormValues = z.infer<typeof roleSchema>;

interface Role {
  id: string;
  name: string;
}

interface Props {
  roles: Role[];
  userId: string;
}

export const SelectRole = ({ roles, userId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: "",
    },
  });

  const onSubmit = async (data: RoleFormValues) => {
    try {
      setIsLoading(true);
      const resp = await assignRoleAction(userId, data.role);

      if (!resp.ok) {
        throw new Error("Error al asignar el rol");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecciona tu rol</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Asignando rol..." : "Confirmar rol"}
        </Button>
      </form>
    </Form>
  );
};
