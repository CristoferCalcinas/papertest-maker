// React y Next.js
import { signIn } from "@/auth";

// Componentes UI
import { Button } from "@/components/ui/button";
import type { buttonVariants } from "@/components/ui/button";

// Iconos
import { FaGithub, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import type { IconType } from "react-icons";

// Utilidades
import { VariantProps } from "class-variance-authority";

type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;
type Provider = "google" | "facebook" | "github";

interface LoginOptionProps {
  name: string;
  icon: IconType;
  variant: ButtonVariant;
  provider: Provider;
}

/**
 * Maneja la autenticación social con el proveedor especificado
 * @param provider - Proveedor de autenticación social
 */
async function handleSocialLogin(provider: Provider) {
  "use server";
  try {
    await signIn(provider);
  } catch (error) {
    console.error(`Error al autenticar con ${provider}:`, error);
    throw error;
  }
}

const LoginOption = ({
  name,
  icon: Icon,
  variant = "default",
  provider,
}: LoginOptionProps) => {
  return (
    <form
      action={async () => {
        "use server"; // Esto asegura que la lógica de servidor sea explícita
        await handleSocialLogin(provider);
      }}
    >
      <Button
        variant={variant}
        className="w-full flex items-center justify-center gap-2"
        type="submit"
      >
        Continuar con {name}
        <Icon className="w-5 h-5" />
      </Button>
    </form>
  );
};

const SOCIAL_PROVIDERS: LoginOptionProps[] = [
  {
    name: "Google",
    icon: FcGoogle,
    variant: "default",
    provider: "google",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    variant: "default",
    provider: "facebook",
  },
  {
    name: "Github",
    icon: FaGithub,
    variant: "secondary",
    provider: "github",
  },
] as const;

export const SocialAuthButtons = () => (
  <div className="space-y-4">
    {SOCIAL_PROVIDERS.map((provider) => (
      <LoginOption key={provider.name} {...provider} />
    ))}
  </div>
);
