import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
// import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { FormControl, TextField } from "@mui/material";
import useModifyParamsForm from "./useModifyParamsForm";
import ViewParametersData from "./ViewParametersData";
import {
  otherConfigInvesticaseSpideringEventsSaveURL,
  // otherConfigInvesticaseSpideringALVIdOtherActionsURL,
  otherConfigInvesticaseSpideringNmiIdURL,
} from "../../../../helpers/Urls";
import { getMsgsFromErrorCode } from "../../../../helpers/utils";
import moment from "moment";
import client from "../../../../helpers/Api";
import MenuItem from "@mui/material/MenuItem";
// import Checkbox from "@mui/material/Checkbox";
import DropdownSelect from "../../../../components/dropdownSelect/dropdownSelect";
import Select from "@mui/material/Select";
function ModifyParametersData({ selectedParam, closeModalPopup }) {
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [otherActions, setOtherActions] = useState([]);
  const [issueTypes, setIssueTypes] = useState([]);
  const [createIssueTypeId, setCreateIssueTypeId] = useState([]);

  const [subTypes, setSubTypes] = useState([]);

  const initialState = {
    modificationType: "",
    description: selectedParam.description || "",
    score: selectedParam.speScore.toString() || "",
    detail: selectedParam.detail || "",
    subType: "",
    createIssueType: "",
    generateReport: selectedParam.speGenerateReport || "",
    comments: selectedParam.speComments || "",
    // investicaseActions: selectedParam.speInvActionDesc || "",
    // otherActions: selectedParam.speOtherActionDesc || "",
    // freqData: selectedParam.speFreqDesc || "",
  };

  useEffect(() => {
    if (selectedParam?.nmiId) {
      getNmiIdDropdownData();
    }
  }, [selectedParam?.nmiId]);

  // const getOtherActionsDropdownData = async () => {
  //   try {
  //     const response =
  //       process.env.REACT_APP_ENV === "mockserver"
  //         ? await client.get(
  //             otherConfigInvesticaseSpideringALVIdOtherActionsURL
  //           )
  //         : await client.get(
  //             `${otherConfigInvesticaseSpideringALVIdOtherActionsURL}${selectedParam?.speOtherActionAlc}`
  //           );
  //     setOtherActions([response]);
  //   } catch (errorResponse) {
  //     const newErrMsgs = getMsgsFromErrorCode(
  //       `POST:${process.env.REACT_APP_OTHER_CONFIG_REASON_DROPDOWN_URL}`,
  //       errorResponse
  //     );
  //     setErrorMessages(newErrMsgs);
  //   }
  // };

  const getNmiIdDropdownData = async () => {
    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(otherConfigInvesticaseSpideringNmiIdURL)
          : await client.get(`${otherConfigInvesticaseSpideringNmiIdURL}0`);
      setIssueTypes(response || []);
    } catch (errorResponse) {
      const newErrMsgs = getMsgsFromErrorCode(
        `POST:${process.env.REACT_APP_OTHER_CONFIG_REASON_DROPDOWN_URL}`,
        errorResponse
      );
      setErrorMessages(newErrMsgs);
    }
  };

  const getSubTypesDropdownData = async () => {
    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(otherConfigInvesticaseSpideringNmiIdURL)
          : await client.get(
              `${otherConfigInvesticaseSpideringNmiIdURL}${values?.createIssueType}`
            );
      setSubTypes(response || []);
    } catch (errorResponse) {
      const newErrMsgs = getMsgsFromErrorCode(
        `POST:${process.env.REACT_APP_OTHER_CONFIG_REASON_DROPDOWN_URL}`,
        errorResponse
      );
      setErrorMessages(newErrMsgs);
    }
  };

  const onSubmit = async () => {
    console.log("values::", values);
    setLoading(true);
    setErrorMessages([]);
    let modificationDate;
    if (values.modificationType === "CHANGE") {
      modificationDate = values.modificationDate?.format("MM/DD/YYYY");
    } else if (values.modificationType === "ENDDATE") {
      modificationDate = values.endDate?.format("MM/DD/YYYY");
    } else {
      modificationDate = values.reinstateDate?.format("MM/DD/YYYY");
    }

    const payload = {
      speId: selectedParam.speId,
      modificationType: values.modificationType,
      modificationDt: modificationDate,
      description: values.description,
      detail: values.detail,
      speScore: Number(values.score),
      speComments: values?.comments,
      speInvActionCdAlc: selectedParam.speInvActionCdAlc,
      speType: selectedParam.speType,
      speNumber: selectedParam.speNumber,
      speOriginCd: selectedParam.speOriginCd,
      speBlockHome: selectedParam.speBlockHome,
      speHomeDisallows: selectedParam.speHomeDisallows,
      speSpecialCertify: selectedParam.speSpecialCertify,
      speAutoMarkers: selectedParam.speAutoMarkers,
      rptId:values.generateReport,
      nmisubtypeid:values.subType,
      // speFreqCd:selectedParam.speFreqCdAlc,
      // speOtherActionCd:selectedParam.speOtherActionAlc
    };

    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(otherConfigInvesticaseSpideringEventsSaveURL)
          : await client.post(
              otherConfigInvesticaseSpideringEventsSaveURL,
              payload
            );
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

  useEffect(() => {
    if (createIssueTypeId) {
      getSubTypesDropdownData();
    }
  }, [createIssueTypeId]);

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
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"space-between"}
                spacing={8}
              >
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

                <Stack direction={"row"} justifyContent={"flex-start"}>
                  <Typography
                    className="label"
                    style={{
                      width: "30%",
                      display: "flex",
                      alignSelf: "center",
                      fontWeight: "initial",
                    }}
                  >
                    <span className="required">*</span>Score:
                  </Typography>
                  <TextField
                    sx={{ width: "30%" }}
                    size="small"
                    id="score"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.score ?? ""}
                    error={touched.score && Boolean(errors.score)}
                    helperText={touched.score && errors.score}
                    name="score"
                  />
                </Stack>
              </Stack>
            </Paper>

            <Paper elevation={6} className="modify-dialog-content-paper">
              <Stack spacing={0.6} mt={1.5}>
                <Stack direction="row" alignItems="start">
                  <Typography className="label-text" style={{ width: "16%" }}>
                    Originates from:
                  </Typography>
                  <Typography>Claim Certification</Typography>
                </Stack>
                <Stack direction="row" alignItems="start">
                  <Typography className="label-text" style={{ width: "19%" }}>
                    <span className="required">*</span>Description:
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    id="description"
                    label="Description"
                    variant="outlined"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.description ?? ""}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    name="description"
                    disabled={values.modificationType === "Description"}
                    inputProps={{ maxLength: 150 }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="start"
                  style={{ marginTop: "0.7rem" }}
                >
                  <Typography className="label-text" style={{ width: "19%" }}>
                    <span className="required">*</span>Details:
                  </Typography>
                  <TextField
                    size="medium"
                    fullWidth
                    id="detail"
                    label="Details"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.detail ?? ""}
                    error={touched.detail && Boolean(errors.detail)}
                    helperText={touched.detail && errors.detail}
                    name="detail"
                    multiline
                    rows={2}
                  />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="start"
                  style={{ marginTop: "0.7rem" }}
                >
                  <Typography className="label-text" style={{ width: "19%" }}>
                    Comments:
                  </Typography>
                  <TextField
                    size="medium"
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
                </Stack>
                <Grid container>
                  <Grid item md={6}>
                    <Grid container>
                      <Grid
                        item
                        md={3.6}
                        sx={{ display: "flex", alignSelf: "center" }}
                      >
                        <Typography className="label-text">
                          Create issue-Type:
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Select
                          sx={{ m: 1, minWidth: 350 }}
                          size="small"
                          name={"createIssueType"}
                          value={values?.createIssueType}
                          onChange={(e) => {
                            // handleChange(name);
                            setFieldValue("createIssueType", e.target.value);
                            setCreateIssueTypeId(e.target.value);
                          }}
                          error={touched?.name && Boolean(errors?.name)}
                          helperText={touched?.name && errors?.name}
                        >
                          {issueTypes?.map((issueType) => (
                            <MenuItem
                              key={issueType?.nmiId}
                              value={issueType?.nmiId}
                            >
                              {issueType?.nmiDesc}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={6}>
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "",
                      }}
                    >
                      <Grid
                        item
                        md={3}
                        sx={{ display: "flex", alignSelf: "center" }}
                      >
                        <Typography className="label-text">
                          Sub-type:
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <DropdownSelect
                          name="subType"
                          value={values.subType}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                        >
                          {subTypes.map((subType) => (
                            <MenuItem
                              key={subType?.nmiId}
                              value={subType?.nmiId}
                            >
                              {subType?.nmiDesc}
                            </MenuItem>
                          ))}
                        </DropdownSelect>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item md={6}>
                    <Grid container>
                      <Grid
                        item
                        md={3.66}
                        sx={{ display: "flex", alignSelf: "center" }}
                      >
                        <Typography className="label-text">
                          Generate Report:
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <DropdownSelect
                          name="generateReport"
                          value={values.generateReport}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                        >
                          {selectedParam?.reportList.map((report) => (
                            <MenuItem
                              key={report?.rptId}
                              value={report?.rptName}
                            >
                              {report?.rptName}
                            </MenuItem>
                          ))}
                        </DropdownSelect>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item md={6}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography className="label-text">
                          Auto increment markers
                        </Typography>
                      }
                      sx={{ marginLeft: "60px", className: "label-text" }}
                    />
                  </Grid> */}
                </Grid>

                {/* <Grid container>
                  <Grid item md={6}>
                    <Grid container>
                      <Grid
                        item
                        md={3.66}
                        sx={{ display: "flex", alignSelf: "center" }}
                      >
                        <Typography className="label-text">
                          <span className="required">*</span>InvestiCase
                          Actions:
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <DropdownSelect
                          name="investicaseActions"
                          value={values.investicaseActions}
                          setFieldValue={setFieldValue}
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                        >
                          {names.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </DropdownSelect>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item md={6}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography className="label-text">
                          Block Home page when this event occurs
                        </Typography>
                      }
                      sx={{ marginLeft: "60px", className: "label-text" }}
                    />
                  </Grid>
                </Grid> */}

                {/* <Grid container>
                  <Grid item md={6}>
                    <Grid container>
                      <Grid
                        item
                        md={3.66}
                        sx={{ display: "flex", alignSelf: "center" }}
                      >
                        <Typography className="label-text">
                          Other Actions:
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <DropdownSelect
                          name="otherActions"
                          value={values.otherActions}
                          setFieldValue={setFieldValue}
                        >
                          {otherActions.map((otherAction) => (
                            <MenuItem
                              key={otherAction?.alvId}
                              value={otherAction?.alvId}
                            >
                              {otherAction?.alvShortDecTxt}
                            </MenuItem>
                          ))}
                        </DropdownSelect>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item md={6}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography className="label-text">
                          Apply special rules to disallow certain actions on the
                          Home page
                        </Typography>
                      }
                      sx={{ marginLeft: "60px", className: "label-text" }}
                    />
                  </Grid>
                </Grid> */}

                {/* <Grid container>
                  <Grid item md={6}>
                    <Grid container>
                      <Grid
                        item
                        md={3.66}
                        sx={{ display: "flex", alignSelf: "center" }}
                      >
                        <Typography className="label-text">
                          Freq. of Data Pattern:
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <DropdownSelect
                          name="freqData"
                          value={values.freqData}
                          setFieldValue={setFieldValue}
                        >
                          {names.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </DropdownSelect>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item md={6}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography className="label-text">
                          Apply special rules on certification when this event
                          occurs
                        </Typography>
                      }
                      sx={{ marginLeft: "60px", className: "label-text" }}
                    />
                  </Grid>
                </Grid> */}

                {/* <Grid container>
                  <Grid item md={6}>
                    <Grid container>
                      <Grid
                        item
                        md={3.66}
                        sx={{ display: "flex", alignSelf: "center" }}
                      >
                        <Typography className="label-text">
                          Sub-Type:
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <DropdownSelect
                          name="subType"
                          value={values.subType}
                          setFieldValue={setFieldValue}
                        >
                          {names.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </DropdownSelect>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid> */}
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
