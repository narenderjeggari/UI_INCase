import React, { useEffect, useState } from "react";
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
  Grid,
  Box,
  Select,
  MenuItem,
  Checkbox,
  FormHelperText,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { FormControl, TextField } from "@mui/material";
import {
  otherConfigWorkSearchWaiversSaveURL,
  otherConfigReasonsDropdownURL,
  otherConfigBusinessUnitDropdownURL,
} from "../../../../helpers/Urls";
import { getMsgsFromErrorCode } from "../../../../helpers/utils";
import moment from "moment";
import client from "../../../../helpers/Api";
import ViewParametersData from "./ViewParametersData";
import useModifyParamsForm from "./useModifyParamsForm";

function ModifyParametersData({ selectedParam, closeModalPopup }) {
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [reasons, setReasons] = useState([]);
  const [businessUnits, setBusinessUnits] = useState([]);

  const { reasonCd, reasonsAlcId, businessUnit, autoOverwrite } =
    selectedParam;
  const initialState = {
    modificationType: "",
    configurationDate: null,
    startDate: null,
    endDate: null,
    deactivateDate: null,
    reactivateDate: null,

    noAutoOverwrite: autoOverwrite !== "Y",
    reasonCd: reasonCd || "",
    businessUnit: "",
    comments: "",
  };

  useEffect(() => {
    if (reasonsAlcId) {
      getReasonsDropdownData();
    }
  }, [reasonsAlcId]);

  const getReasonsDropdownData = async () => {
    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(otherConfigReasonsDropdownURL)
          : await client.post(otherConfigReasonsDropdownURL, {
              alcId: reasonsAlcId,
              active: "Y",
            });

      setReasons(response.allowValAlvList);
    } catch (errorResponse) {
      const newErrMsgs = getMsgsFromErrorCode(
        `POST:${process.env.REACT_APP_OTHER_CONFIG_REASON_DROPDOWN_URL}`,
        errorResponse,
      );
      setErrorMessages(newErrMsgs);
    }
  };

  useEffect(() => {
    getBusinessUnitsDropdownData();
  }, []);

  const getBusinessUnitsDropdownData = async () => {
    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(otherConfigBusinessUnitDropdownURL)
          : await client.get(otherConfigBusinessUnitDropdownURL);

      setBusinessUnits(response);
      const selectedValue = response
        .find((x) => x.businessUnitName === businessUnit)
        ?.businessUnitCd?.toString();
      setFieldValue("businessUnit", selectedValue);
    } catch (errorResponse) {
      const newErrMsgs = getMsgsFromErrorCode(
        `GET:${process.env.REACT_APP_OTHER_CONFIG_BUSINESS_UNIT_DROPDOWN_URL}`,
        errorResponse,
      );
      setErrorMessages(newErrMsgs);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    setErrorMessages([]);
    const payload = {
      wswcId: selectedParam.wswcId,
      modificationType: values.modificationType,
      modificationDate:
        values.modificationType === "CONFIGURATION"
          ? values.configurationDate?.format("MM/DD/YYYY")
          : values.modificationType === "STARTDATE"
            ? values.startDate?.format("MM/DD/YYYY")
            : values.modificationType === "ENDDATE"
              ? values.endDate?.format("MM/DD/YYYY")
              : values.modificationType === "DEACTIVATE"
                ? values.deactivateDate?.format("MM/DD/YYYY")
                : values.reactivateDate?.format("MM/DD/YYYY"),
      autoOverwrite: values.noAutoOverwrite ? "N" : "Y",
      reasonCd: parseInt(values.reasonCd),
      businessUnit: parseInt(values.businessUnit),
      comments: values.comments,
    };
    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(otherConfigWorkSearchWaiversSaveURL)
          : await client.post(otherConfigWorkSearchWaiversSaveURL, payload);
      setLoading(false);
      closeModalPopup(true);
    } catch (errorResponse) {
      setLoading(false);
      const newErrMsgs = getMsgsFromErrorCode(
        `POST:${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_WAIVERS_SAVE_URL}`,
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
            <Box
              sx={{
                backgroundColor: "#9faee6",
                padding: 1,
                borderRadius: 2,
              }}
            >
              <Typography className="label-text">
                You are choosing to alter a configuration. If you would like to
                proceed, you must select Modification Type and enter your
                Comments.
              </Typography>
            </Box>
            <Paper elevation={6} className="modify-dialog-content-paper">
              <Stack direction="row" spacing={5}>
                <Grid container>
                  <Grid item md={2}>
                    <Typography className="label-text">
                      <span className="required">*</span>Modification Type:
                    </Typography>
                  </Grid>
                  <Grid item md={10}>
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      name="modificationType"
                      value={values.modificationType}
                      onChange={(event) => {
                        setFieldValue("configurationDate", null);
                        setFieldValue("startDate", null);
                        setFieldValue("endDate", null);
                        setFieldValue("deactivateDate", null);
                        setFieldValue("reactivateDate", null);
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
                      <Grid container spacing={5}>
                        <Grid item md={6}>
                          <Grid container>
                            <Grid item md={8}>
                              <FormControlLabel
                                value="CONFIGURATION"
                                control={<Radio size="small" />}
                                label="Modification Configuration as of:"
                                className="label-text"
                                sx={{ fontWeight: 700 }}
                              />
                            </Grid>
                            <Grid item md={4}>
                              <LocalizationProvider dateAdapter={AdapterMoment}>
                                <FormControl sx={{ width: 150 }}>
                                  <DatePicker
                                    disabled={
                                      values.modificationType !==
                                      "CONFIGURATION"
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
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item md={6}>
                          <Grid container>
                            <Grid item md={6}>
                              <FormControlLabel
                                value="STARTDATE"
                                control={<Radio size="small" />}
                                label="Change Start Date to:"
                              />
                            </Grid>
                            <Grid item md={6}>
                              <LocalizationProvider dateAdapter={AdapterMoment}>
                                <FormControl sx={{ width: 150 }}>
                                  <DatePicker
                                    disabled={
                                      values.modificationType !== "STARTDATE"
                                    }
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
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid container spacing={5}>
                        <Grid item md={6}>
                          <Grid container>
                            <Grid item md={8}>
                              <FormControlLabel
                                value="DEACTIVATE"
                                control={<Radio size="small" />}
                                label="Deactivate after:"
                                className="label-text"
                                sx={{ fontWeight: 700 }}
                              />
                            </Grid>
                            <Grid item md={4}>
                              <LocalizationProvider dateAdapter={AdapterMoment}>
                                <FormControl sx={{ width: 150 }}>
                                  <DatePicker
                                    disabled={
                                      values.modificationType !== "DEACTIVATE"
                                    }
                                    name="deactivateDate"
                                    format="MM/DD/YYYY"
                                    value={values.deactivateDate}
                                    onChange={(value) =>
                                      setFieldValue("deactivateDate", value)
                                    }
                                    slotProps={{ textField: { size: "small" } }}
                                    minDate={moment().add(1, "days")}
                                    // minDate={moment().startOf('week').startOf('day')}
                                    // maxDate={moment().add("months", 2)}
                                  />
                                  {touched.deactivateDate &&
                                    errors.deactivateDate && (
                                      <FormHelperText style={{ color: "red" }}>
                                        {errors.deactivateDate}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              </LocalizationProvider>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={6}>
                          <Grid container>
                            <Grid item md={6}>
                              <FormControlLabel
                                value="ENDDATE"
                                control={<Radio size="small" />}
                                label="Change End Date to:"
                              />
                            </Grid>
                            <Grid item md={6}>
                              <LocalizationProvider dateAdapter={AdapterMoment}>
                                <FormControl sx={{ width: 150 }}>
                                  <DatePicker
                                    disabled={
                                      values.modificationType !== "ENDDATE"
                                    }
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
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid container spacing={5}>
                        <Grid item md={6}>
                          <Grid container>
                            <Grid item md={8}>
                              <FormControlLabel
                                value="REACTIVATE"
                                control={<Radio size="small" />}
                                label="Reactivate on:"
                                className="label-text"
                                sx={{ fontWeight: 700 }}
                              />
                            </Grid>
                            <Grid item md={4}>
                              <LocalizationProvider dateAdapter={AdapterMoment}>
                                <FormControl sx={{ width: 150 }}>
                                  <DatePicker
                                    disabled={
                                      values.modificationType !== "REACTIVATE"
                                    }
                                    name="reactivateDate"
                                    format="MM/DD/YYYY"
                                    value={values.reactivateDate}
                                    onChange={(value) =>
                                      setFieldValue("reactivateDate", value)
                                    }
                                    slotProps={{ textField: { size: "small" } }}
                                    minDate={moment().add(1, "days")}
                                    // minDate={moment().startOf('week').startOf('day')}
                                    // maxDate={moment().add("months", 2)}
                                  />
                                  {touched.reactivateDate &&
                                    errors.reactivateDate && (
                                      <FormHelperText style={{ color: "red" }}>
                                        {errors.reactivateDate}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              </LocalizationProvider>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </RadioGroup>
                    {/* </FormControl> */}
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
            <Paper elevation={6} className="modify-dialog-content-paper">
              <Stack spacing={1}>
                <Grid container alignItems="center">
                  <Grid item md={6}>
                    <Grid container>
                      <Grid className="label-text" item md={4}>
                        <Typography className="label-text">
                          <span className="required">*</span>Reason:
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <Select
                          id="reasonCd"
                          value={values.reasonCd}
                          name="reasonCd"
                          onChange={handleChange}
                          size="small"
                        >
                          {reasons.map((reason) => (
                            <MenuItem value={reason.alvId}>
                              {reason.alvShortDecTxt}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={6}>
                    <Grid container>
                      <Grid className="label-text" item md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="noAutoOverwrite"
                              onChange={handleChange}
                              checked={values.noAutoOverwrite}
                            />
                          }
                          label="NO AUTO OVERWRITE"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item md={6}>
                    <Grid container>
                      <Grid className="label-text" item md={4}>
                        <Typography className="label-text">
                          <span className="required">*</span>Business Unit:
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <Select
                          id="businessUnit"
                          value={values.businessUnit}
                          name="businessUnit"
                          onChange={handleChange}
                          size="small"
                        >
                          {businessUnits.map((bu) => (
                            <MenuItem value={bu.businessUnitCd}>
                              {bu.businessUnitName}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid className="label-text" item md={2}>
                    <Typography className="label-text">
                      <span className="required">*</span>Comments:
                    </Typography>
                  </Grid>
                  <Grid item md={10}>
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
