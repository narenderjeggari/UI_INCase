import { FormikHelpers, useFormik } from "formik";
import { dropdownListSchema } from "../../../helpers/Validation";

const useModifyParamsForm = (onSubmit, initialValues) => {
  return useFormik({
    initialValues,
    validationSchema: dropdownListSchema,
    validateOnChange: true,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit,
  });
};

export default useModifyParamsForm;
