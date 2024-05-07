import { IBaseDateTimePickerFieldProps } from "../../types";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const BaseInputField: React.FC<IBaseDateTimePickerFieldProps> = ({
  _id,
  placeholder,
  autoFocus,
  required,
  label,
  register,
  error,
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={_id} className="mb-4 text-gray-500 dark:text-gray-300">
        {label}
      </label>
      {/* <input
        id={_id}
        {...register(_id)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
      /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker
            {...register(_id)}
            name={_id}
            label={placeholder}
            autoFocus={autoFocus}
            required={required}
          />
        </DemoContainer>
      </LocalizationProvider>
      {<p className="my-4 text-xs italic text-red-500 text-start"> {error}</p>}
    </div>
  );
};

export default BaseInputField;
