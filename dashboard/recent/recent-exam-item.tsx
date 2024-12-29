interface Props {
  imageUrl: string;
  createdAt: string;
  description: string;
  grade: string;
  lastModifiedAt: string;
  questions: string;
  subject: string;
  title: string;
  id: string;
}

export const RecentExamItem = ({ title, questions, lastModifiedAt }: Props) => {
  return (
    <li className="flex items-center justify-evenly space-x-6 py-6">
      <div className="flex items-center justify-between space-x-6">
        <img
          alt={""}
          src={"/no-photo.jpg"}
          className="size-20 flex-none rounded-md bg-gray-200 object-cover"
        />
        <div className="flex flex-col justify-between space-y-2">
          <div className="text-sm font-medium">
            <h3 className="text-gray-900">{title}</h3>
            <p className="text-gray-500">{questions} preguntas / 10 minutos</p>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Edit
            </button>
            <div className="flex border-l border-gray-300 pl-4">
              <button
                type="button"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span>{lastModifiedAt}</span>
      </div>
    </li>
  );
};
