import { useFormik } from "formik";
import { otherConfigWorkSearchWaiversSchema } from "../../../../helpers/Validation";

const useModifyParamsForm = (onSubmit, initialValues) => {
  return useFormik({
    initialValues,
    validationSchema: otherConfigWorkSearchWaiversSchema,
    validateOnChange: true,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit,
  });
};

export default useModifyParamsForm;
