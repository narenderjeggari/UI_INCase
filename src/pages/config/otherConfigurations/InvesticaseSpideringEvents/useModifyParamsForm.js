import { useFormik } from "formik";
import { otherConfigInvesticaseSchema } from "../../../../helpers/Validation";

const useModifyParamsForm = (onSubmit, initialValues) => {
  return useFormik({
    initialValues,
    validationSchema: otherConfigInvesticaseSchema,
    validateOnChange: true,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit,
  });
};

export default useModifyParamsForm;
