import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { IBaseSelect2FieldProps } from "../../types";

const BaseSelect2Field: React.FC<IBaseSelect2FieldProps> = ({
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
  const handleChange = (event: SelectChangeEvent<string>) => {
    if (onChange && !readonly) {
      onChange(event.target.value);
    }
  };
  return (
    <div className="mb-5">
      <Select
        id={_id}
        name={_id}
        label={label}
        labelId={label + _id}
        autoFocus={autoFocus}
        required={required}
        fullWidth
        {...register(_id, value)}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      >
        {
          options && options.map((option: any) => (
            <MenuItem value={option._id} key={option._id}>{option.name}</MenuItem>

          ))
        }
      </Select>
      {<p className="my-4 text-xs italic text-red-500 text-start"> {error}</p>}
    </div>
  );
};

export default BaseSelect2Field;
