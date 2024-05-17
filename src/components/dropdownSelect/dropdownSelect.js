import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";

function DropdownSelect({
  children,
  name,
  value,
  // setFieldValue,
  touched,
  errors,
  handleChange,
}) {
  return (
      <Select
        sx={{ m: 1, minWidth: 350 }}
        size="small"
        name={name}
        value={value}
        onChange={handleChange}
        error={touched?.name && Boolean(errors?.name)}
        helperText={touched?.name && errors?.name}
      >
        {children}
      </Select>
  );
}
export default DropdownSelect;
