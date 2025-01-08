import Link from "next/link";

export const EmptyState = () => {
  return (
    <div className="bg-transparent">
      <div className="mx-auto max-w-7xl">
        <header className="pl-1 sm:flex sm:items-baseline sm:justify-between md:pl-5">
          <h1 className="text-4xl font-bold tracking-tighter">
            ¿Qué deseas explorar?
          </h1>
        </header>

        <section className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <article className="group relative aspect-[2/1] overflow-hidden rounded-lg sm:row-span-2 sm:aspect-square">
            <figure>
              <img
                alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSVpwKoFw-8Rl9ZD4-VKLEHkJOYIGF1ZFmwDMhRyEpG9dGBSlPE"
                className="absolute size-full object-cover group-hover:opacity-75"
              />
              <figcaption className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
            </figure>
            <div className="absolute inset-0 flex items-end p-6">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href={`/dashboard/new-exam`}>
                    <span className="absolute inset-0" />
                    Crear examen
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Agregar preguntas y establecer límite de tiempo
                </p>
              </div>
            </div>
          </article>
          <article className="group relative aspect-[2/1] overflow-hidden rounded-lg sm:aspect-auto">
            <figure>
              <img
                alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuL9a79PKafcn309KcGuWOlFwslbcVL2ajlru4ywJ8s-aG16wy"
                className="absolute size-full object-cover group-hover:opacity-75"
              />
              <figcaption className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
            </figure>
            <div className="absolute inset-0 flex items-end p-6">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href={`/exams`}>
                    <span className="absolute inset-0" />
                    Ver exámenes
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Revisar exámenes creados anteriormente
                </p>
              </div>
            </div>
          </article>
          <article className="group relative aspect-[2/1] overflow-hidden rounded-lg sm:aspect-auto">
            <figure>
              <img
                alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                src="https://us.123rf.com/450wm/tevarak11/tevarak112010/tevarak11201001659/157553015-l%C3%A1piz-y-borrador-en-hojas-de-respuestas-o-formulario-de-prueba-estandarizado-con-respuestas.jpg?ver=6"
                className="absolute size-full object-cover group-hover:opacity-75"
              />
              <figcaption className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
            </figure>
            <div className="absolute inset-0 flex items-end p-6">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href={`/exams/results`}>
                    <span className="absolute inset-0" />
                    Resultados
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Ver resultados de exámenes realizados
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};
