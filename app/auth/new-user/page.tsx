import { CreateUserForm } from "@/auth/register/create-user-form";

export default function RegisterPage() {
  return (
    <main className="container mx-auto px-4 pt-16">
      <article className="max-w-[450px] mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          Registro de usuario
        </h1>
        
        <CreateUserForm />
      </article>
    </main>
  );
}
