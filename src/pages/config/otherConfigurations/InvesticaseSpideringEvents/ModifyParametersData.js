import React, { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
// import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import {
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { FormControl, TextField } from "@mui/material";
import useModifyParamsForm from "./useModifyParamsForm";
import ViewParametersData from "./ViewParametersData";
import { otherConfigInvesticaseSaveURL } from "../../../../helpers/Urls";
import { getMsgsFromErrorCode } from "../../../../helpers/utils";
import moment from "moment";
import client from "../../../../helpers/Api";

function ModifyParametersData({ selectedParam, closeModalPopup }) {
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { name, spaAttrWeight, spaAutoMark, spaFormatDesc, spaRemarks, spaComments } =
    selectedParam;
  const initialState = {
    modificationType: "",
    name: name,
    spaAttrWeight: spaAttrWeight || "",
    spaAutoMark: spaAutoMark || "",
    spaFormatDesc: spaFormatDesc || "",
    spaRemarks: spaRemarks || "",
    spaComments: spaComments || "",
  };

  const onSubmit = async () => {
    setLoading(true);
    setErrorMessages([]);
    let modificationDate;
    if (values.modificationType === "CHANGE") {
      modificationDate = values.modificationDate?.format("MM/DD/YYYY");
    }
    else if (values.modificationType === "ENDDATE") {
      modificationDate = values.endDate?.format("MM/DD/YYYY");
    } else {
      modificationDate = values.reinstateDate?.format("MM/DD/YYYY");
    }
    const payload = {
      speId: selectedParam.speId,
      modificationType: values.modificationType,
      modificationDt: modificationDate,
      spaAttrWeight: values?.spaAttrWeight,
      spaComments: values?.spaComments,
      // name: selectedParam?.name,
      // spaAutoMark: selectedParam?.spaAutoMark,
      // spaMainSrcCd: selectedParam?.spaMainSrcCd,
      // spaOtherSources: selectedParam?.spaOtherSources,
      // spaFormatCd: selectedParam?.spaFormatCd,
      // spaDp4ActiveInd: selectedParam?.spaDp4ActiveInd,
      // spaEndOvwrMm: selectedParam?.spaEndOvwrMm,
      // spaSarSubmitSpecialRuleInd: selectedParam?.spaSarSubmitSpecialRuleInd,
    };

    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(otherConfigInvesticaseSaveURL)
          : await client.post(otherConfigInvesticaseSaveURL, payload);
      setLoading(false);
      closeModalPopup(true);
    } catch (errorResponse) {
      setLoading(false);
      const newErrMsgs = getMsgsFromErrorCode(
        `POST:${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SAVE_URL}`,
        errorResponse
      );
      setErrorMessages(newErrMsgs);
    }
  };

  const formik = useModifyParamsForm(onSubmit, initialState);
  const {
    touched,
    values,
    errors,
    handleChange,
    // handleBlur,
    handleSubmit,
    isValid,
    dirty,
    setFieldValue,
  } = formik;

  // const handleKeyPress = (event) => {
  //   const charCode = event.which ? event.which : event.keyCode;
  //   if (charCode < 48 || charCode > 57) {
  //     event.preventDefault();
  //   }
  // };

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

            {!selectedParam?.reinstateFlag ? (
              <Paper elevation={6} className="modify-dialog-content-paper">
                <Stack direction="row" alignItems="center" spacing={10}>
                  <Typography className="label-text">
                    <span className="required">*</span>Modification Type:
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      name="modificationType"
                      value={values.modificationType}
                      onChange={(event) => {
                        setFieldValue("modificationDate", null);
                        setFieldValue("endDate", null);
                        setFieldValue("modificationType", event.target.value);
                      }}
                      error={
                        touched.modificationType &&
                        Boolean(errors.modificationType)
                      }
                      helperText={
                        touched.modificationType && errors.modificationType
                      }
                      className="label-text"
                    >
                      <Stack direction="row" spacing={2}>
                        <FormControlLabel
                          value="CHANGE"
                          control={<Radio size="small" />}
                          label="Modification Configuration as of:"
                          className="label-text"
                          sx={{ fontWeight: 700 }}
                        />
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <FormControl sx={{ width: 150 }}>
                            <DatePicker
                              disabled={values.modificationType !== "CHANGE"}
                              name="modificationDate"
                              format="MM/DD/YYYY"
                              value={values.modificationDate}
                              onChange={(value) => {
                                setFieldValue("modificationDate", value);
                              }}
                              slotProps={{ textField: { size: "small" } }}
                              minDate={moment().add(1, "days")}
                            // minDate={moment().startOf('week').startOf('day')}
                            // maxDate={moment().add("months", 2)}
                            />
                            {touched.modificationDate &&
                              errors.modificationDate && (
                                <FormHelperText style={{ color: "red" }}>
                                  {errors.modificationDate}
                                </FormHelperText>
                              )}
                          </FormControl>
                        </LocalizationProvider>
                        <FormControlLabel
                          value="ENDDATE"
                          control={<Radio size="small" />}
                          label="Change End Date to:"
                        />
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <FormControl sx={{ width: 150 }}>
                            <DatePicker
                              disabled={values.modificationType !== "ENDDATE"}
                              name="endDate"
                              format="MM/DD/YYYY"
                              value={values.endDate}
                              onChange={(value) =>
                                setFieldValue("endDate", value)
                              }
                              slotProps={{ textField: { size: "small" } }}
                              minDate={moment().add(1, "days")}
                            // minDate={moment().startOf('week').startOf('day')}
                            // maxDate={moment().add("months", 2)}
                            />
                            {touched.endDate && errors.endDate && (
                              <FormHelperText style={{ color: "red" }}>
                                {errors.endDate}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </LocalizationProvider>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </Paper>
            ) : (
              <Paper elevation={6} className="modify-dialog-content-paper">
                <Stack direction="row" alignItems="center" spacing={10}>
                  <Typography className="label-text">
                    <span className="required">*</span>Modification Type:
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      name="modificationType"
                      value={values.modificationType}
                      onChange={(event) => {
                        setFieldValue("modificationDate", null);
                        setFieldValue("reinstateDate", null);
                        console.log('modificationType:::', event.target.value);
                        setFieldValue("modificationType", event.target.value);
                      }}
                      error={
                        touched.modificationType &&
                        Boolean(errors.modificationType)
                      }
                      helperText={
                        touched.modificationType && errors.modificationType
                      }
                      className="label-text"
                    >
                      <Stack direction="row" spacing={2}>
                        <FormControlLabel
                          value="REINSTATE"
                          control={<Radio size="small" />}
                          label="Change Reinstate Date to:"
                        />
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <FormControl sx={{ width: 150 }}>
                            <DatePicker
                              disabled={
                                values.modificationType !== "REINSTATE"
                              }
                              name="reinstateDate"
                              format="MM/DD/YYYY"
                              value={values.resinstateDate}
                              onChange={(value) =>
                                setFieldValue("reinstateDate", value)
                              }
                              slotProps={{ textField: { size: "small" } }}
                              minDate={moment().add(1, "days")}
                            // minDate={moment().startOf('week').startOf('day')}
                            // maxDate={moment().add("months", 2)}
                            />
                            {touched.reinstateDate && errors.reinstateDate && (
                              <FormHelperText style={{ color: "red" }}>
                                {errors.reinstateDate}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </LocalizationProvider>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </Paper>
            )}

            <Paper elevation={6} className="modify-dialog-content-paper">
              <Stack spacing={1} mt={1.5}>
                <Grid container alignItems="start">
                  <Grid item md={6}>
                    {/* <Grid container>
                      <Grid className="label-text" item md={4.5}>
                        <Typography className="label-text">
                          <span className="required">*</span>Name:
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          size="small"
                          fullWidth
                          id="name"
                          label="Name"
                          variant="outlined"
                          onChange={handleChange}
                          // onKeyPress={handleKeyPress}
                          // inputProps={{
                          //   inputMode: "numeric",
                          //   pattern: "[0-9]*",
                          //   maxLength: 2,
                          //   className: "numericInput",
                          // }}
                          value={values.name ?? ""}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          name="name"
                        />
                      </Grid>
                    </Grid> */}
                  </Grid>
                  {/* <Grid item md={6}>
                    <Grid container>
                      <Grid className="label-text" item md={4}>
                        <Typography className="label-text">
                          <span className="required">*</span>Automark:
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          size="small"
                          fullWidth
                          id="automarkInd"
                          label="Automark"
                          variant="outlined"
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            maxLength: 2,
                            className: "numericInput",
                          }}
                          value={values.automarkInd ?? ""}
                          error={
                            touched.automarkInd &&
                            Boolean(errors.automarkInd)
                          }
                          helperText={
                            touched.automarkInd && errors.automarkInd
                          }
                          name="automarkInd"
                        />
                      </Grid>
                    </Grid>
                  </Grid> */}
                </Grid>
                <Grid container alignItems="start">
                  <Grid item md={6}>
                    <Grid container>
                      <Grid className="label-text" item md={4.5}>
                        <Typography className="label-text">
                          <span className="required">*</span>
                          Weight:
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          size="small"
                          fullWidth
                          id="spaAttrWeight"
                          label="Weight"
                          variant="outlined"
                          onChange={handleChange}
                          // onKeyPress={handleKeyPress}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            maxLength: 2,
                            className: "numericInput",
                          }}
                          value={values.spaAttrWeight ?? ""}
                          error={
                            touched.spaAttrWeight &&
                            Boolean(errors.spaAttrWeight)
                          }
                          helperText={
                            touched.spaAttrWeight && errors.spaAttrWeight
                          }
                          name="spaAttrWeight"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item md={6}>
                    <Grid container>
                      <Grid className="label-text" item md={4}>
                        <Typography className="label-text">
                          <span className="required">*</span>Attr format type:
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          size="small"
                          fullWidth
                          id="attrFormatType"
                          label="Attr format type"
                          variant="outlined"
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            maxLength: 2,
                            className: "numericInput",
                          }}
                          value={values.attrFormatType ?? ""}
                          error={
                            touched.attrFormatType && Boolean(errors.attrFormatType)
                          }
                          helperText={
                            touched.attrFormatType && errors.attrFormatType
                          }
                          name="attrFormatType"
                        />
                      </Grid>
                    </Grid>
                  </Grid> */}
                </Grid>
                <Grid container>
                  <Grid className="label-text" item md={2.25}>
                    <Typography className="label-text">
                      <span className="required">*</span>Comments:
                    </Typography>
                  </Grid>
                  <Grid item md={9.75}>
                    <TextField
                      size="small"
                      fullWidth
                      id="spaComments"
                      label="Comments"
                      variant="outlined"
                      onChange={handleChange}
                      error={touched.spaComments && Boolean(errors.spaComments)}
                      helperText={touched.spaComments && errors.spaComments}
                      name="spaComments"
                      multiline
                      rows={2}
                    />
                  </Grid>
                </Grid>
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
          <Button
            size="small"
            variant="contained"
            disabled={!(isValid && dirty)}
            type="submit"
          >
            OK
          </Button>
          <Button size="small" variant="outlined" onClick={closeModalPopup}>
            Cancel
          </Button>
        </DialogActions>
      </Stack>
    </>
  );
}

export default React.memo(ModifyParametersData);
