"use client";

// React y Next.js
import { signIn } from "next-auth/react";

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

const LoginOption = ({
  name,
  icon: Icon,
  variant = "default",
  provider,
}: LoginOptionProps) => {
  return (
    <Button
      variant={variant}
      className="w-full flex items-center justify-center gap-2"
      type="submit"
      onClick={() => signIn(provider, { redirect: false })}
    >
      Continuar con {name}
      <Icon className="w-5 h-5" />
    </Button>
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
    variant: "secondary",
    provider: "facebook",
  },
  {
    name: "Github",
    icon: FaGithub,
    variant: "default",
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
