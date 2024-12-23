import { EmailPasswordForm } from "@/auth/login/email-password-form";
import { SocialAuthButtons } from "@/auth/login/social-auth-buttons";

export default function LoginPage() {
 return (
   <main className="container mx-auto px-4 pt-16">
     <article className="max-w-[450px] mx-auto">
       <h1 className="text-2xl font-bold text-center mb-6">
         Inicio de sesión
       </h1>

       <SocialAuthButtons />

       <div className="flex items-center my-8" role="separator">
         <div className="flex-grow h-px bg-gray-300" />
         <span className="px-4 text-gray-500">o</span>
         <div className="flex-grow h-px bg-gray-300" />
       </div>

       <EmailPasswordForm />
     </article>
   </main>
 );
}