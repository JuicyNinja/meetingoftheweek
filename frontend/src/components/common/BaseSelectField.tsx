import { IBaseSelectFieldProps } from "../../types";

const BaseSelectField: React.FC<IBaseSelectFieldProps> = ({
  _id,
  placeholder,
  autoFocus,
  required,
  label,
  register,
  options,
  error,
  readonly,
  value,
  onChange
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange && !readonly) {
      onChange(event.target.value);
    }
  };
  return (
    <div className="mb-1">
        <label htmlFor={_id} className="mb-4 text-gray-500 dark:text-gray-300">
            {label}
        </label>
        <select
            id={_id}
            name={_id}
            {...register(_id, value)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            required={required}
            disabled={readonly}
            value={value}
            onChange={handleChange} 
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        >
            {
                options && options.map((option: any) => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))
            }
        </select>
      {<p className="my-4 text-xs italic text-red-500 text-start"> {error}</p>}
    </div>
  );
};

export default BaseSelectField;
