import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function ViewParametersData({ selectedParam }) {
  return (
    <Stack spacing={0.2}>
      <Grid container alignItems="center">
        <Grid item md={12}>
          <Grid container alignItems="flex-start">
            <Grid className="label-text" item md={2}>
              Name:
            </Grid>
            <Grid item md={8}>
              {selectedParam.parLongName}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item md={12}>
          <Grid container alignItems="center">
            <Grid className="label-text" item md={2}>
              Category:
            </Grid>
            <Grid item md={8}>
              {selectedParam.parCategoryCdValue}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item md={12}>
          <Grid container alignItems="center">
            <Grid className="label-text" item md={2}>
              Value:
            </Grid>
            <Grid item md={8} sx={{ marginLeft: "0.6rem" }}>
              <Stack direction="row" spacing={5}>
                <Stack direction="row">
                  <FormControlLabel
                    name="number"
                    control={
                      <Checkbox
                        size="small"
                        style={{ padding: "0" }}
                        disabled
                        checked={selectedParam.numericType}
                      />
                    }
                    label="Number:"
                    sx={{ marginRight: "0.2rem" }}
                  />
                  {selectedParam.numericType && (
                    <Typography style={{ paddingTop: "1px" }}>
                      {selectedParam.numericValue}
                    </Typography>
                  )}
                </Stack>
                <Stack direction="row">
                  <FormControlLabel
                    name="text"
                    control={
                      <Checkbox
                        size="small"
                        style={{ padding: "0" }}
                        disabled
                        checked={selectedParam.textType}
                      />
                    }
                    label="Alpha:"
                    sx={{ marginRight: "0.2rem" }}
                  />
                  {selectedParam.textType && (
                    <Typography style={{ paddingTop: "1px" }}>
                      {selectedParam.textValue}
                    </Typography>
                  )}
                </Stack>
                <Stack direction="row">
                  <FormControlLabel
                    name="date"
                    control={
                      <Checkbox
                        size="small"
                        style={{ padding: "0" }}
                        disabled
                        checked={selectedParam.dateType}
                      />
                    }
                    label="Date:"
                    sx={{ marginRight: "0.2rem" }}
                  />
                  {selectedParam.dateType && (
                    <Typography style={{ paddingTop: "1px" }}>
                      {selectedParam.dateValue}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item md={5.75}>
          <Grid container alignItems="center">
            <Grid className="label-text" item md={4.1}>
              Effective From:
            </Grid>
            <Grid item md={2.6}>
              {selectedParam.parEffectiveDate}
            </Grid>

            <Grid className="label-text" item md={1.3}>
              Until:
            </Grid>
            <Grid item md={3}>
              {selectedParam.parExpirationDate}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6.25} alignItems="center">
          <Grid container>
            <Grid className="label-text" item md={2.5}>
              System Ref.:
            </Grid>
            <Grid item md={9.5}>
              {selectedParam.parShortName}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ margin: "0.5rem 0", lineHeight: "1.2" }}>
        <Grid className="label-text" item md={2}>
          Remarks:
        </Grid>
        <Grid className="view-params-comments-list" item md={10}>
          {selectedParam.parRemarks?.split("<br/>")?.map((remark) => (
            <Typography className="view-params-comments-list-comment">
              {remark}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Stack>
  );
}

export default React.memo(ViewParametersData);
