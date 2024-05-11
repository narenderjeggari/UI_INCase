import Select from "@mui/material/Select";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import MenuItem from "@mui/material/MenuItem";

function DropdownSelect({ children, name, value, setFieldValue }) {
  //   const { name, value } = field;
  //   const { setFieldValue } = form;
  return (
    <>
      <Select
        name={name}
        value={value}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    </>
  );
}
export default DropdownSelect;
