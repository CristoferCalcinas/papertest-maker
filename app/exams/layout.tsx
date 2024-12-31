import { BreadcrumbTitle } from "./create/ui/breadcrumb-title";

export default function ExamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="mx-auto max-w-7xl pt-10 pl-5"
      aria-label="Breadcrumb de navegación"
    >
      <BreadcrumbTitle />
      {children}
    </section>
  );
}
