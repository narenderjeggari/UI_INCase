import React, { useState, useEffect } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  Paper,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import client from "../../../helpers/Api";
import ViewParametersData from "./ViewParametersData";
import BorderedSection from "../../../components/borderedSection";
import useModifyParamsForm from "./useModifyParamsForm";
import { individualParamsSaveURL } from "../../../helpers/Urls";
import { getMsgsFromErrorCode } from "../../../helpers/utils";
import moment from "moment";

function ModifyParametersData({ selectedParam, closeModalPopup }) {
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disableEffectiveUntil, setDisableEffectiveUntil] = useState(false);
  const [effectiveUntil, setEffectiveUntil] = useState(null);

  const {
    parLongName,
    numericType,
    textType,
    dateType,
    numericValue,
    textValue,
    dateValue,
    parEffectiveDate,
    parExpirationDate,
    modTypeChangeFlag,
    modTypeEndDateFlag,
    modTypeReinstateFlag,
    openEndedExistFlag,
  } = selectedParam;

  const calculateChangeAsOfDate = (startDate) => {
    const stDate = moment(startDate);
    return stDate.isAfter(moment()) ? stDate : null;
  };

  const disableValueFields = () => {
    return (
      moment(values.updateDate).isSame(moment(parEffectiveDate)) &&
      moment(values.updateDate).isSameOrBefore(moment())
    );
  };

  const initialState = {
    modificationType: "",
    updateDate: calculateChangeAsOfDate(parEffectiveDate),
    endDate: null,
    reinstateDate: null,
    name: parLongName,
    numericType: numericType,
    textType: textType,
    dateType: dateType,
    numericValue: numericType ? numericValue : "",
    textValue: textType ? textValue : "",
    dateValue: dateType ? moment(dateValue) : null,
    remarks: "",
  };

  const onSubmit = async () => {
    setLoading(true);
    setErrorMessages([]);
    let payload = {
      parId: selectedParam.parId,
      modificationType: values.modificationType, // CHANGE, ENDDATE,REINSTATE
      modificationDt:
        values.modificationType === "CHANGE"
          ? values.updateDate?.format("MM/DD/YYYY")
          : values.modificationType === "ENDDATE"
            ? values.endDate?.format("MM/DD/YYYY")
            : values.reinstateDate?.format("MM/DD/YYYY"),
      name: values.name,
      numericValue: parseFloat(values.numericValue),
      textValue: values.textValue,
      dateValue: values.dateValue?.format("MM/DD/YYYY"),
      remarks: values.remarks,
      effectiveUntilDt: values.effectiveUntil
        ? values.effectiveUntil?.format("MM/DD/YYYY")
        : "",
    };
    if (!textType) delete payload.textValue;
    if (!numericType) delete payload.numericValue;
    if (!dateType) delete payload.dateValue;
    if (!values.effectiveUntil) delete payload.effectiveUntilDt;

    try {
      // const response = process.env.REACT_APP_ENV === "mockserver" ? await client.get(
      //     individualParamsSaveURL
      // ) : await client.post(
      //     individualParamsSaveURL, payload
      // );
      const response = await client.post(individualParamsSaveURL, payload);

      setLoading(false);
      closeModalPopup(true);
    } catch (errorResponse) {
      setLoading(false);
      const newErrMsgs = getMsgsFromErrorCode(
        `POST:${process.env.REACT_APP_INDIVIDUAL_PARAM_SAVE_URL}`,
        errorResponse,
      );
      setErrorMessages(newErrMsgs);
    }
  };
  const formik = useModifyParamsForm(
    onSubmit,
    initialState,
    disableEffectiveUntil,
    openEndedExistFlag,
  );
  const {
    touched,
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    dirty,
    setFieldValue,
  } = formik;

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      !(charCode === 46 || charCode === 190 || charCode === 110) &&
      (charCode < 48 || charCode > 57)
    ) {
      event.preventDefault();
    }
  };

  const handleModifyTypeOnchange = (event) => {
    setFieldValue("updateDate", calculateChangeAsOfDate(parEffectiveDate));
    setFieldValue("endDate", null);
    setFieldValue("reinstateDate", null);
    setFieldValue("modificationType", event.target.value);
    if (event.target.value === "ENDDATE") {
      setFieldValue("name", parLongName);
      setEffectiveUntil(null);
      setDisableEffectiveUntil(true);
    } else if (event.target.value === "CHANGE" && !parExpirationDate) {
      setEffectiveUntil(null);
      setDisableEffectiveUntil(true);
    } else if (event.target.value === "REINSTATE") {
      setEffectiveUntil(null);
      setDisableEffectiveUntil(false);
      setFieldValue("numericValue", "");
      setFieldValue("textValue", "");
      setFieldValue("dateValue", null);
    } else {
      setDisableEffectiveUntil(false);
    }
  };

  const populateChangeAsOfDate = (date) => {
    setFieldValue("updateDate", date);
    if (effectiveUntil && date.isAfter(effectiveUntil)) {
      setEffectiveUntil(null);
    }
  };

  useEffect(() => {
    setFieldValue("effectiveUntil", effectiveUntil);
  }, [effectiveUntil]);

  return (
    <>
      <Stack
        noValidate
        component="form"
        // spacing={theme.spacing(4)}
        width="100%"
        onSubmit={handleSubmit}
      >
        <DialogContent className="modify-dialog-content">
          <Stack spacing={0.7}>
            <Paper elevation={6} className="modify-dialog-content-paper">
              <ViewParametersData selectedParam={selectedParam} />
            </Paper>

            {/* <Divider /> */}
            <Paper elevation={6} className="modify-dialog-content-paper">
              <Stack direction="row" alignItems="center">
                <Typography className="label-text" style={{ width: "15%" }}>
                  <span className="required">*</span>Modification Type:
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-labelledby="demo-error-radios"
                    name="modificationType"
                    value={values.modificationType}
                    onChange={(event) => handleModifyTypeOnchange(event)}
                    className="label-text"
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      {modTypeChangeFlag && (
                        <>
                          <FormControlLabel
                            value="CHANGE"
                            control={<Radio size="small" />}
                            label="Change - As of:"
                            className="label-text"
                            sx={{ fontWeight: 700 }}
                          />
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <FormControl sx={{ width: 150 }}>
                              <DatePicker
                                disabled={values.modificationType !== "CHANGE"}
                                name="updateDate"
                                // label="Mass LayOff Date"
                                format="MM/DD/YYYY"
                                value={values.updateDate}
                                onChange={(value) =>
                                  populateChangeAsOfDate(value)
                                }
                                slotProps={{ textField: { size: "small" } }}
                                minDate={moment().add(1, "days")}
                                maxDate={
                                  parExpirationDate
                                    ? moment(parExpirationDate)
                                    : null
                                }
                              />
                              {touched.updateDate && errors.updateDate && (
                                <FormHelperText style={{ color: "red" }}>
                                  {errors.updateDate}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </LocalizationProvider>
                        </>
                      )}
                      {modTypeEndDateFlag && (
                        <>
                          <FormControlLabel
                            value="ENDDATE"
                            control={<Radio size="small" />}
                            label="End Date - On:"
                          />
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <FormControl sx={{ width: 150 }}>
                              <DatePicker
                                disabled={values.modificationType !== "ENDDATE"}
                                name="endDate"
                                // label="Mass LayOff Date"
                                format="MM/DD/YYYY"
                                value={values.endDate}
                                onChange={(value) =>
                                  setFieldValue("endDate", value)
                                }
                                slotProps={{ textField: { size: "small" } }}
                                minDate={
                                  parEffectiveDate &&
                                  moment(parEffectiveDate).isAfter(moment())
                                    ? moment(parEffectiveDate)
                                    : moment().add(1, "days")
                                }
                                // maxDate={moment().add("months", 2)}
                              />
                              {touched.endDate && errors.endDate && (
                                <FormHelperText style={{ color: "red" }}>
                                  {errors.endDate}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </LocalizationProvider>
                        </>
                      )}
                      {modTypeReinstateFlag && (
                        <>
                          <FormControlLabel
                            value="REINSTATE"
                            control={<Radio size="small" />}
                            label="Reinstate - As of:"
                          />
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <FormControl sx={{ width: 150 }}>
                              <DatePicker
                                disabled={
                                  values.modificationType !== "REINSTATE"
                                }
                                name="reinstateDate"
                                // label="Mass LayOff Date"
                                format="MM/DD/YYYY"
                                value={values.reinstateDate}
                                onChange={(value) =>
                                  setFieldValue("reinstateDate", value)
                                }
                                slotProps={{ textField: { size: "small" } }}
                                minDate={moment().add(1, "days")}
                                // maxDate={moment().add("months", 2)}
                              />
                              {touched.reinstateDate &&
                                errors.reinstateDate && (
                                  <FormHelperText style={{ color: "red" }}>
                                    {errors.reinstateDate}
                                  </FormHelperText>
                                )}
                            </FormControl>
                          </LocalizationProvider>
                        </>
                      )}
                    </Stack>
                  </RadioGroup>
                  {touched.modificationType && errors.modificationType && (
                    <FormHelperText style={{ color: "red" }}>
                      {errors.modificationType}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>
            </Paper>
            {/* <Divider /> */}
            <Paper elevation={6} className="modify-dialog-content-paper">
              <Stack spacing={0.6} mt={1.5}>
                <Stack direction="row" alignItems="start">
                  <Typography className="label-text" style={{ width: "19%" }}>
                    <span className="required">*</span>Name:
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    id="name"
                    label="Name"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name ?? ""}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    name="name"
                    disabled={values.modificationType === "ENDDATE"}
                    inputProps={{ maxLength: 150 }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="start"
                  spacing={5}
                  style={{ marginTop: "0.8rem" }}
                >
                  <BorderedSection title="Value: ">
                    <Stack direction="row" alignItems="start" spacing={2}>
                      <Stack direction="row" alignItems="start" spacing={8.3}>
                        <Typography className="label-text">Number:</Typography>
                        <TextField
                          size="small"
                          fullWidth
                          id="numericValue"
                          label="Number"
                          variant="outlined"
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          className="numericInput"
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            maxLength: 15,
                            className: "numericInput",
                          }}
                          value={values.numericValue ?? ""}
                          error={
                            touched.numericValue && Boolean(errors.numericValue)
                          }
                          helperText={
                            touched.numericValue && errors.numericValue
                          }
                          name="numericValue"
                          disabled={
                            !numericType ||
                            values.modificationType === "ENDDATE" ||
                            disableValueFields()
                          }
                        />
                      </Stack>

                      <Stack direction="row" alignItems="start" spacing={1}>
                        <Typography className="label-text">Alpha:</Typography>
                        <TextField
                          size="small"
                          fullWidth
                          id="textValue"
                          label="Text"
                          variant="outlined"
                          onChange={handleChange}
                          value={values.textValue ?? ""}
                          error={touched.textValue && Boolean(errors.textValue)}
                          helperText={touched.textValue && errors.textValue}
                          name="textValue"
                          disabled={
                            !textType ||
                            values.modificationType === "ENDDATE" ||
                            disableValueFields()
                          }
                          inputProps={{ maxLength: 100 }}
                        />
                      </Stack>

                      <Stack direction="row" alignItems="start" spacing={1}>
                        <Typography className="label-text">Date:</Typography>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <FormControl>
                            <DatePicker
                              disabled={
                                !dateType ||
                                values.modificationType === "ENDDATE" ||
                                disableValueFields()
                              }
                              name="dateValue"
                              // label="Mass LayOff Date"
                              format="MM/DD/YYYY"
                              value={values.dateValue}
                              onChange={(value) =>
                                setFieldValue("dateValue", value)
                              }
                              slotProps={{ textField: { size: "small" } }}
                              minDate={moment().add(1, "days")}
                              // minDate={moment().startOf('week').startOf('day')}
                              // maxDate={moment().add("months", 2)}
                            />
                            {touched.dateValue && errors.dateValue && (
                              <FormHelperText style={{ color: "red" }}>
                                {errors.dateValue}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </LocalizationProvider>
                      </Stack>
                    </Stack>
                  </BorderedSection>
                </Stack>
                <Stack direction="row" alignItems="start" spacing={5}>
                  <Typography className="label-text">
                    {values.modificationType === "CHANGE" &&
                    openEndedExistFlag ? (
                      <span className="required">*</span>
                    ) : (
                      <span style={{ marginLeft: ".4em" }}></span>
                    )}
                    Effective Until:
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <FormControl>
                      <DatePicker
                        disabled={disableEffectiveUntil}
                        name="effectiveUntil"
                        // label="Mass LayOff Date"
                        format="MM/DD/YYYY"
                        value={values.effectiveUntil}
                        onChange={(value) => {
                          setEffectiveUntil(value);
                        }}
                        slotProps={{ textField: { size: "small" } }}
                        minDate={
                          values.updateDate
                            ? values.updateDate
                            : moment().add(1, "days")
                        }
                        // minDate={moment().add(1, "days")}
                        // maxDate={moment().add("months", 2)}
                      />
                      {touched.effectiveUntil && errors.effectiveUntil && (
                        <FormHelperText style={{ color: "red" }}>
                          {errors.effectiveUntil}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </LocalizationProvider>
                </Stack>
                <Stack
                  direction="row"
                  spacing={9}
                  style={{ marginTop: "0.7rem" }}
                >
                  <Typography className="label-text">
                    <span className="required">*</span>Remarks:
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    id="remarks"
                    label="Remarks"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.remarks ?? ""}
                    error={touched.remarks && Boolean(errors.remarks)}
                    helperText={touched.remarks && errors.remarks}
                    name="remarks"
                    multiline
                    rows={2}
                  />
                </Stack>
              </Stack>
            </Paper>
          </Stack>
          <Stack mt={1} direction="row" useFlexGap flexWrap="wrap">
            {errorMessages.map((x) => (
              <div>
                <span className="errorMsg">*{x}</span>
              </div>
            ))}
          </Stack>
        </DialogContent>

        <DialogActions className="modify-dialog-actions">
          {/* disabled={!(isValid && dirty)} */}
          <Button variant="contained" type="submit" size="small">
            OK
          </Button>
          <Button variant="outlined" onClick={closeModalPopup} size="small">
            Cancel
          </Button>
        </DialogActions>
      </Stack>
    </>
  );
}

export default React.memo(ModifyParametersData);
