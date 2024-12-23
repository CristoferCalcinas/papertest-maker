import { Button } from "@/components/ui/button";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import type { IconType } from "react-icons";
import type { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";

type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;

interface SocialProvider {
  name: string;
  icon: IconType;
  variant: ButtonVariant;
}

interface LoginOptionProps extends SocialProvider {
  onLogin?: () => Promise<void>;
}

const LoginOption = ({
  name,
  icon: Icon,
  variant = "default",
  onLogin,
}: LoginOptionProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onLogin?.();
    } catch (error) {
      console.error(`Error logging in with ${name}:`, error);
    }
  };

  return (
    <form action="">
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

const SOCIAL_PROVIDERS: SocialProvider[] = [
  { name: "Google", icon: FcGoogle, variant: "default" },
  { name: "Facebook", icon: FaFacebook, variant: "default" },
  { name: "Github", icon: FaGithub, variant: "secondary" },
] as const;

export const SocialAuthButtons = () => (
  <div className="space-y-4">
    {SOCIAL_PROVIDERS.map((provider) => (
      <LoginOption key={provider.name} {...provider} />
    ))}
  </div>
);
