import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { SelectRole } from "@/auth/assign-role/select-role";

const roles = [
  { id: "TEACHER", name: "Profesor" },
  { id: "STUDENT", name: "Estudiante" },
];

export default async function SelectRolePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session.user.role) {
    redirect("/");
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="max-w-xs w-full md:max-w-lg">
        <SelectRole roles={roles} userId={session.user.id} />
      </section>
    </main>
  );
}
