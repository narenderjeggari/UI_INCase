import React, { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
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
import { otherConfigWorkSearchReqSaveURL } from "../../../../helpers/Urls";
import { getMsgsFromErrorCode } from "../../../../helpers/utils";
import moment from "moment";
import client from "../../../../helpers/Api";

function ModifyParametersData({ selectedParam, closeModalPopup }) {
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { initialClm, additionalClm, incrementFrequency, incrementVal } =
    selectedParam;
  const initialState = {
    modificationType: "",
    initialClaim: initialClm,
    additionalClaim: additionalClm || "",
    incrementFrequency: incrementFrequency || "",
    incrementVal: incrementVal || "",
    comments: "",
  };

  const onSubmit = async () => {
    setLoading(true);
    setErrorMessages([]);
    const payload = {
      wsccId: selectedParam.wsccId,
      modificationType: values.modificationType,
      initialClaim: parseInt(values.initialClaim),
      additionalClaim: parseInt(values.additionalClaim),
      incrementFrequency: parseInt(values.incrementFrequency),
      incrementVal: parseInt(values.incrementVal),
      modificationDate:
        values.modificationType === "CONFIGURATION"
          ? values.configurationDate?.format("MM/DD/YYYY")
          : values.startDate?.format("MM/DD/YYYY"),
      comments: values.comments,
    };
    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(otherConfigWorkSearchReqSaveURL)
          : await client.post(otherConfigWorkSearchReqSaveURL, payload);
      setLoading(false);
      closeModalPopup(true);
    } catch (errorResponse) {
      setLoading(false);
      const newErrMsgs = getMsgsFromErrorCode(
        `POST:${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_REQ_SAVE_URL}`,
        errorResponse,
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
    handleBlur,
    handleSubmit,
    isValid,
    dirty,
    setFieldValue,
  } = formik;

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

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
                      setFieldValue("configurationDate", null);
                      setFieldValue("startDate", null);
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
                        value="CONFIGURATION"
                        control={<Radio size="small" />}
                        label="Modification Configuration as of:"
                        className="label-text"
                        sx={{ fontWeight: 700 }}
                      />
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <FormControl sx={{ width: 150 }}>
                          <DatePicker
                            disabled={
                              values.modificationType !== "CONFIGURATION"
                            }
                            name="configurationDate"
                            format="MM/DD/YYYY"
                            value={values.configurationDate}
                            onChange={(value) =>
                              setFieldValue("configurationDate", value)
                            }
                            slotProps={{ textField: { size: "small" } }}
                            minDate={moment().add(1, "days")}
                            // minDate={moment().startOf('week').startOf('day')}
                            // maxDate={moment().add("months", 2)}
                          />
                          {touched.configurationDate &&
                            errors.configurationDate && (
                              <FormHelperText style={{ color: "red" }}>
                                {errors.configurationDate}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </LocalizationProvider>
                      <FormControlLabel
                        value="STARTDATE"
                        control={<Radio size="small" />}
                        label="Change Start Date to:"
                      />
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <FormControl sx={{ width: 150 }}>
                          <DatePicker
                            disabled={values.modificationType !== "STARTDATE"}
                            name="startDate"
                            format="MM/DD/YYYY"
                            value={values.startDate}
                            onChange={(value) =>
                              setFieldValue("startDate", value)
                            }
                            slotProps={{ textField: { size: "small" } }}
                            minDate={moment().add(1, "days")}
                            // minDate={moment().startOf('week').startOf('day')}
                            // maxDate={moment().add("months", 2)}
                          />
                          {touched.startDate && errors.startDate && (
                            <FormHelperText style={{ color: "red" }}>
                              {errors.startDate}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </LocalizationProvider>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Paper>

            <Paper elevation={6} className="modify-dialog-content-paper">
              <Stack spacing={1} mt={1.5}>
                <Grid container alignItems="start">
                  <Grid item md={6}>
                    <Grid container>
                      <Grid className="label-text" item md={4.5}>
                        <Typography className="label-text">
                          <span className="required">*</span>Initial Claim:
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          size="small"
                          fullWidth
                          id="initialClaim"
                          label="Initial Claim"
                          variant="outlined"
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            maxLength: 2,
                            className: "numericInput",
                          }}
                          value={values.initialClaim ?? ""}
                          error={
                            touched.initialClaim && Boolean(errors.initialClaim)
                          }
                          helperText={
                            touched.initialClaim && errors.initialClaim
                          }
                          name="initialClaim"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={6}>
                    <Grid container>
                      <Grid className="label-text" item md={4}>
                        <Typography className="label-text">
                          <span className="required">*</span>Additional Claim:
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          size="small"
                          fullWidth
                          id="additionalClaim"
                          label="Additional Claim"
                          variant="outlined"
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            maxLength: 2,
                            className: "numericInput",
                          }}
                          value={values.additionalClaim ?? ""}
                          error={
                            touched.additionalClaim &&
                            Boolean(errors.additionalClaim)
                          }
                          helperText={
                            touched.additionalClaim && errors.additionalClaim
                          }
                          name="additionalClaim"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container alignItems="start">
                  <Grid item md={6}>
                    <Grid container>
                      <Grid className="label-text" item md={4.5}>
                        <Typography className="label-text">
                          <span className="required">*</span>Increment
                          Frequency:
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          size="small"
                          fullWidth
                          id="incrementFrequency"
                          label="Increment Frequency"
                          variant="outlined"
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            maxLength: 2,
                            className: "numericInput",
                          }}
                          value={values.incrementFrequency ?? ""}
                          error={
                            touched.incrementFrequency &&
                            Boolean(errors.incrementFrequency)
                          }
                          helperText={
                            touched.incrementFrequency &&
                            errors.incrementFrequency
                          }
                          name="incrementFrequency"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={6}>
                    <Grid container>
                      <Grid className="label-text" item md={4}>
                        <Typography className="label-text">
                          <span className="required">*</span>Increment By:
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          size="small"
                          fullWidth
                          id="incrementVal"
                          label="Increment By"
                          variant="outlined"
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            maxLength: 2,
                            className: "numericInput",
                          }}
                          value={values.incrementVal ?? ""}
                          error={
                            touched.incrementVal && Boolean(errors.incrementVal)
                          }
                          helperText={
                            touched.incrementVal && errors.incrementVal
                          }
                          name="incrementVal"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
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
                      id="comments"
                      label="Comments"
                      variant="outlined"
                      onChange={handleChange}
                      value={values.comments ?? ""}
                      error={touched.comments && Boolean(errors.comments)}
                      helperText={touched.comments && errors.comments}
                      name="comments"
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
