import { IBaseTextarea } from "../../types";

const BaseTextarea: React.FC<IBaseTextarea> = ({
  _id,
  placeholder,
  row,
  label,
  required,
  register,
  error,
}) => {
  return (
    <div className="mb-1">
      <label htmlFor={_id} className="mb-4 text-gray-500 dark:text-gray-300">
        {label}
      </label>
      <textarea
        id={_id}
        rows={row}
        {...register(_id)}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required={required}
      ></textarea>
      {<p className="text-start text-xs italic text-red-500 my-4"> {error} </p>}
    </div>
  );
};

export default BaseTextarea;
