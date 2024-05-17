import { useFormik } from "formik";
import { otherConfiInvesticaseSpideringEventsSchema } from "../../../../helpers/Validation";

const useModifyParamsForm = (onSubmit, initialValues) => {
  return useFormik({
    initialValues,
    validationSchema: otherConfiInvesticaseSpideringEventsSchema,
    validateOnChange: true,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit,
  });
};

export default useModifyParamsForm;
