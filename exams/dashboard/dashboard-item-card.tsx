interface Props {
  createdAt: string;
  description: string;
  grade: string;
  id: string;
  imageUrl: string;
  lastModifiedAt: string;
  questions: string;
  subject: string;
  title: string;
}

export const DashboardItemCard = ({
  createdAt,
  description,
  grade,
  id,
  imageUrl,
  lastModifiedAt,
  questions,
  subject,
  title,
}: Props) => {
  return (
    <li className="flex flex-col gap-6 sm:flex-row items-center">
      <figure className="w-full h-full sm:w-64 aspect-video">
        <img
          alt={`Imagen de portada del examen: ${title}`}
          src={imageUrl}
          className="h-full w-full rounded-2xl object-cover"
          // width={256}
          // height={256}
        />
      </figure>
      <article className="max-w-xl flex-auto">
        <header>
          <h2 className="text-lg/8 font-semibold tracking-tight text-gray-900">
            {title} &nbsp;
            <span className="text-sm text-gray-500">
              Creado:
              {createdAt}
            </span>
          </h2>
          <time className="text-sm text-gray-500" dateTime={lastModifiedAt}>
            Última modificación: {lastModifiedAt}
          </time>
        </header>
        <div className="mt-2 max-w-md flex-auto min-w-0">
          <p className="text-base/7 text-gray-600">{grade}</p>
          <p className="text-sm font-semibold tracking-tight text-gray-900">
            <span>{questions} Preguntas</span>
            <span className="mx-2">/</span>
            <span>{subject}</span>
          </p>
          <p className="mt-6 text-base/7 text-gray-600 line-clamp-1">
            {description}
          </p>
        </div>
      </article>
    </li>
  );
};
