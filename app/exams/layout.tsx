import { BreadcrumbTitle } from "./[action]/ui/breadcrumb-title";

export default function ExamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="mx-auto max-w-7xl"
      aria-label="Breadcrumb de navegación"
    >
      <div className="mt-10 pl-5">
        <BreadcrumbTitle />
      </div>
      <main className="container mx-auto px-4">{children}</main>
    </section>
  );
}
