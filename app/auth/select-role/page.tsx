import { SelectRole } from "@/auth/assign-role/select-role";
import { prisma } from "@/prisma";

export default async function SelectRolePage() {
  const rolesToDatabase = await prisma.role.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="max-w-xs w-full md:max-w-lg">
        <h1 className="mb-2 text-xl font-bold">Elige un rol para continuar</h1>
        <SelectRole roles={rolesToDatabase} />
      </section>
    </main>
  );
}
