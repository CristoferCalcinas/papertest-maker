import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

import { SelectRole } from "@/auth/assign-role/select-role";

export default async function SelectRolePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session.user.roleId !== "no-role-id") {
    redirect("/");
  }

  const roles = await prisma.role.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="max-w-xs w-full md:max-w-lg">
        <SelectRole roles={roles} userId={session.user.id} />
      </section>
    </main>
  );
}
