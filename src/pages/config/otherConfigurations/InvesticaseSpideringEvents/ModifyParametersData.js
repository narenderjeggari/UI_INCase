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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
function ModifyParametersData({ selectedParam, closeModalPopup }) {
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [personName, setPersonName] = useState([]);
  const {
    name,
    spaAttrWeight,
    spaAutoMark,
    spaFormatDesc,
    spaRemarks,
    spaComments,
  } = selectedParam;
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
    } else if (values.modificationType === "ENDDATE") {
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

  const names = [
    "Event 1",
    "Event 2",
    "Event 3",
    "Event 4",
    "Event 5",
    "Event 6",
    "Event 7",
    "Event 8",
    "Event 9",
  ];

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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

            {!selectedParam?.reinstateFlag ? (
              ""
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
                        console.log("modificationType:::", event.target.value);
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
                              disabled={values.modificationType !== "REINSTATE"}
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
              <Stack spacing={0.6} mt={1.5}>
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
                    id="details"
                    label="Details"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.details ?? ""}
                    error={touched.details && Boolean(errors.details)}
                    helperText={touched.details && errors.details}
                    name="details"
                    multiline
                    rows={2}
                  />
                </Stack>
                <Grid container alignItems="start">
                  <Grid item md={2}>
                    <Typography className="label-text">
                      <span className="required">*</span>Create issue-Type:
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      size="small"
                      fullWidth
                      id="createIssueType"
                      label="CreateIssueType"
                      variant="outlined"
                      onChange={handleChange}
                      // onKeyPress={handleKeyPress}
                      value={values.createIssueType ?? ""}
                      error={
                        touched.createIssueType &&
                        Boolean(errors.createIssueType)
                      }
                      helperText={
                        touched.createIssueType && errors.createIssueType
                      }
                      name="createIssueType"
                      inputProps={{ maxLength: 50 }}
                    />
                  </Grid>
                  <Grid item md={1}></Grid>
                  <Grid item md={2}>
                    <Typography className="label-text">Sub-type:</Typography>
                  </Grid>
                  <Grid item md={3}>
                    <FormControl sx={{ width: 200 }}>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={personName}
                        onChange={handleChange1}
                        input={<OutlinedInput label="Name" />}
                        // MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            // style={getStyles(name, personName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
