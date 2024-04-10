import React, { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Checkbox,
  Paper,
} from "@mui/material";
import { dropdownAccordianItemSaveURL } from "../../../helpers/Urls";
import client from "../../../helpers/Api";
import { FormControl, TextField } from "@mui/material";
import { getMsgsFromErrorCode } from "../../../helpers/utils";
import ViewParametersData from "./ViewParametersData";
import useModifyParamsForm from "./useModifyParamsForm";

function ModifyParametersData({
  selectedParam,
  alcDecipherLabel,
  closeModalPopup,
  alvDisplayOnListDetails,
}) {
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    alvShortDecTxt,
    alvSpShortDescTxt,
    alvLongDescTxt,
    alvDisplayOnList,
    alvDecipherCode,
  } = selectedParam;
  const initialState = {
    modificationType: "",
    name: alvShortDecTxt,
    spanishName: alvSpShortDescTxt || "",
    alvDecipherCd: alvDecipherCode || "",
    alcDecipherLabel: alcDecipherLabel || "",
    displayOnList:
      alvDisplayOnList?.map(
        (alvId) =>
          alvDisplayOnListDetails.find((e) => e.alvId === alvId).alvLongDescTxt
      ) || [],
    description: alvLongDescTxt || "",
    comments: "",
  };
  const onSubmit = async () => {
    setLoading(true);
    setErrorMessages([]);
    const payload = {
      alvId: selectedParam.alvId,
      modificationType: values.modificationType, // CHANGE, ENDDATE,REINSTATE
      name: values.name,
      spanishName: values.spanishName,
      alvDecipherCd: values.alvDecipherCd,
      displayOnList: values.displayOnList.map((selectedDisplayItem) => {
        return alvDisplayOnListDetails.find(
          (e) => e.alvLongDescTxt === selectedDisplayItem
        ).alvId;
      }),
      description: values.description,
      comments: values.comments,
    };
    try {
      process.env.REACT_APP_ENV === "mockserver"
        ? await client.get(dropdownAccordianItemSaveURL)
        : await client.post(dropdownAccordianItemSaveURL, payload);
      setLoading(false);
      closeModalPopup(true);
    } catch (errorResponse) {
      setLoading(false);
      const newErrMsgs = getMsgsFromErrorCode(
        `POST:${process.env.REACT_APP_DROPDOWN_ACCORDIAN_ITEM_SAVE_URL}`,
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
    handleSubmit,
    isValid,
    dirty,
    setFieldValue,
  } = formik;

  const handleDisplayOnChange = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      if (name === "All Views" || name === "Do Not Display") {
        formik.setFieldValue("displayOnList", [name]);
      } else {
        const list = [...formik.values.displayOnList].filter(
          (v) => v !== "Do Not Display"
        );
        formik.setFieldValue("displayOnList", [...list, name]);
      }
    } else {
      formik.setFieldValue(
        "displayOnList",
        formik.values.displayOnList.filter((v) => v !== name)
      );
    }
  };

  const checkDisabled = (alvLongDescTxt) => {
    if (alvLongDescTxt !== "All Views") {
      const allViewsSelected = formik.values.displayOnList.find(
        (v) => v === "All Views"
      );
      if (allViewsSelected) {
        return true;
      }
      const anyOtherSelected = formik.values.displayOnList.find(
        (v) => v !== "All Views" && v !== "Do Not Display"
      );
      if (anyOtherSelected && alvLongDescTxt === "Do Not Display") {
        return true;
      }

      const othersSelected = formik.values.displayOnList.filter(
        (v) => v !== "All Views" && v !== "Do Not Display"
      );

      if (
        othersSelected.length === alvDisplayOnListDetails.length - 3 &&
        !formik.values.displayOnList.includes(alvLongDescTxt)
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Stack
        noValidate
        component="form"
        autocomplete="off"
        // spacing={theme.spacing(4)}
        width="100%"
        onSubmit={handleSubmit}
      >
        <DialogContent className="modify-dialog-content">
          <Stack spacing={0.7}>
            <Paper elevation={6} className="modify-dialog-content-paper">
              <ViewParametersData
                selectedParam={selectedParam}
                alcDecipherLabel={alcDecipherLabel}
              />
            </Paper>
            <Box
              sx={{
                backgroundColor: "#9faee6",
                padding: 1,
                borderRadius: 2,
              }}
            >
              <Typography className="label-text">
                This will only take effect after the next scheduled build.
              </Typography>
            </Box>
            <Paper elevation={6} className="modify-dialog-content-paper">
              <Stack direction="row" spacing={5} alignItems="start">
                <Grid container alignItems="center">
                  <Grid item md={2}>
                    <Typography className="label-text">
                      <span className="required">*</span>Modification Type:
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <FormControl component="fieldset" sx={{ width: "100%" }}>
                      <RadioGroup
                        aria-labelledby="demo-error-radios"
                        name="modificationType"
                        value={values.modificationType}
                        onChange={(event) => {
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
                        sx={{ width: "100%" }}
                      >
                        {selectedParam.alvActiveInd === "Y" ? (
                          <Stack direction="row">
                            <FormControlLabel
                              value="CHANGE"
                              control={<Radio size="small" />}
                              label="Update"
                              className="label-text"
                              sx={{ fontWeight: 700 }}
                            />
                            <FormControlLabel
                              value="DEACTIVATE"
                              control={<Radio size="small" />}
                              label="Deactivate"
                            />
                          </Stack>
                        ) : (
                          <FormControlLabel
                            value="REACTIVATE"
                            control={<Radio size="small" />}
                            label="Reactivate"
                          />
                        )}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
            <Paper elevation={6} className="modify-dialog-content-paper">
              <Stack spacing={0.4} mt={1.5}>
                <Grid container alignItems="start">
                  <Grid item md={2}>
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
                      value={values.name ?? ""}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      name="name"
                      inputProps={{ maxLength: 50 }}
                    />
                  </Grid>
                  <Grid item md={1}></Grid>
                  <Grid item md={2}>
                    <Typography className="label-text">
                      Spanish Name:
                    </Typography>
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      size="small"
                      fullWidth
                      id="spanishName"
                      label="Spanish Name"
                      variant="outlined"
                      onChange={handleChange}
                      // onKeyPress={handleKeyPress}
                      value={values.spanishName ?? ""}
                      error={touched.spanishName && Boolean(errors.spanishName)}
                      helperText={touched.spanishName && errors.spanishName}
                      name="spanishName"
                      inputProps={{
                        maxLength: 200,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  {alcDecipherLabel && (
                    <>
                      <Grid item md={2}>
                        <Typography className="label-text">
                          <span className="required">*</span>
                          {alcDecipherLabel}:
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <RadioGroup
                          aria-labelledby="demo-error-radios"
                          name="alvDecipherCd"
                          value={values.alvDecipherCd}
                          onChange={(event) => {
                            setFieldValue("alvDecipherCd", event.target.value);
                          }}
                          error={
                            touched.alvDecipherCd &&
                            Boolean(errors.alvDecipherCd)
                          }
                          helperText={
                            touched.alvDecipherCd && errors.alvDecipherCd
                          }
                          className="label-text"
                          sx={{ width: "100%" }}
                        >
                          <Stack direction="row">
                            <FormControlLabel
                              value="WVR"
                              control={<Radio size="small" />}
                              label="WVR"
                              className="label-text"
                              sx={{ fontWeight: 700 }}
                            />
                            <FormControlLabel
                              value="REQ"
                              control={<Radio size="small" />}
                              label="REQ"
                              sx={{ fontWeight: 700 }}
                            />
                            <FormControlLabel
                              value="WVR & REQ"
                              control={<Radio size="small" />}
                              label="WVR & REQ"
                              className="label-text"
                              sx={{ fontWeight: 700 }}
                            />
                          </Stack>
                        </RadioGroup>
                        {/* </FormControl> */}
                      </Grid>
                      <Grid item md={1}></Grid>
                    </>
                  )}

                  {/* <Grid item md={2}>
                                <Typography className='label-text'>
                                    Sort Order:
                                </Typography>
                            </Grid>
                            <Grid item md={3} >
                                <Typography >
                                    {selectedParam.alvSortOrderNbr}
                                </Typography>
                            </Grid> */}
                </Grid>
                <Grid container alignItems="center">
                  <Grid className="label-text" item md={2}>
                    <Typography className="label-text">
                      <span className="required">*</span>Display on:
                    </Typography>
                  </Grid>
                  <Grid item md={10}>
                    <Stack direction="row">
                      {alvDisplayOnListDetails.map((displayOnDetails) => {
                        return (
                          <FormControlLabel
                            name={displayOnDetails.alvLongDescTxt}
                            control={
                              <Checkbox
                                checked={formik.values.displayOnList.includes(
                                  displayOnDetails.alvLongDescTxt
                                )}
                                onChange={handleDisplayOnChange}
                                disabled={checkDisabled(
                                  displayOnDetails.alvLongDescTxt
                                )}
                              />
                            }
                            label={displayOnDetails.alvLongDescTxt}
                          />
                        );
                      })}
                      {/*<FormControlLabel name="All Views"*/}
                      {/*    control={<Checkbox checked={formik.values.displayOnList.includes("All Views")} onChange={handleDisplayOnChange} />}*/}
                      {/*    label="All Views"*/}
                      {/*/>*/}
                      {/*<FormControlLabel name="Staff"*/}
                      {/*    control={<Checkbox checked={formik.values.displayOnList.includes("Staff")} onChange={handleDisplayOnChange} />}*/}
                      {/*    label="Staff"*/}
                      {/*/>*/}
                      {/*<FormControlLabel name="Claimant"*/}

                      {/*    control={<Checkbox checked={formik.values.displayOnList.includes("Claimant")} onChange={handleDisplayOnChange} />}*/}
                      {/*    label="Claimant"*/}
                      {/*/>*/}
                      {/*<FormControlLabel name="Employer"*/}
                      {/*    control={<Checkbox checked={formik.values.displayOnList.includes("Employer")} onChange={handleDisplayOnChange} />}*/}
                      {/*    label="Employer"*/}
                      {/*/>*/}
                      {/*<FormControlLabel name="Do Not Display"*/}
                      {/*    control={<Checkbox checked={formik.values.displayOnList.includes("Do Not Display")} onChange={handleDisplayOnChange} />}*/}
                      {/*    label="Do Not Display"*/}
                      {/*/>*/}
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container alignItems="start">
                  <Grid className="label-text" item md={2}>
                    Description:
                  </Grid>
                  <Grid item md={10}>
                    <TextField
                      size="small"
                      fullWidth
                      id="description"
                      label="Description"
                      variant="outlined"
                      onChange={handleChange}
                      value={values.description ?? ""}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                      name="description"
                      multiline
                      rows={1}
                      inputProps={{ maxLength: 1000 }}
                    />
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
            variant="contained"
            disabled={!(isValid && dirty)}
            type="submit"
            size="small"
          >
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
