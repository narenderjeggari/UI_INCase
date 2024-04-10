import { FormikHelpers, useFormik } from "formik";
import { otherConfigWorkSearchRequirementsSchema } from "../../../../helpers/Validation";

const useModifyParamsForm = (onSubmit, initialValues) => {
  return useFormik({
    initialValues,
    validationSchema: otherConfigWorkSearchRequirementsSchema,
    validateOnChange: true,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit,
  });
};

export default useModifyParamsForm;
