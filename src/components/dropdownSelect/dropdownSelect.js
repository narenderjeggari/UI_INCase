import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";

function DropdownSelect({ children, name, value, setFieldValue }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 350 }} size="small">
      <Select
        name={name}
        value={value}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
}
export default DropdownSelect;
