import { FormikHelpers, useFormik } from "formik";
import { individualParametersSchema } from "../../../helpers/Validation";

const useModifyParamsForm = (
  onSubmit,
  initialValues,
  disableEffectiveUntil,
  openEndedExistFlag,
) => {
  return useFormik({
    initialValues,
    validationSchema: individualParametersSchema(
      disableEffectiveUntil,
      openEndedExistFlag,
    ),
    validateOnChange: true,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit,
  });
};

export default useModifyParamsForm;
