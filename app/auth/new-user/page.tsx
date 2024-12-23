import { CreateUserForm } from "@/auth/register/create-user-form";

export default function RegisterPage() {
  return (
    <div className="w-full container mx-auto px-4 pt-16">
      <h1 className="text-2xl font-bold text-center mb-6">
        Registro de usuario
      </h1>
      <div className="max-w-[450px] mx-auto">
        <section>
          <CreateUserForm />
        </section>
      </div>
    </div>
  );
}
