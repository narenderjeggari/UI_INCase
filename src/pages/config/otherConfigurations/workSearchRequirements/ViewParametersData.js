import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

function ViewParametersData({ selectedParam }) {
  return (
    <Stack spacing={0.2}>
      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={4.5}>
              Program:
            </Grid>
            <Grid item md={6}>
              {selectedParam.program}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Effective From:
            </Grid>
            <Grid item md={4}>
              {selectedParam.startDate}
            </Grid>

            <Grid className="label-text" item md={1.3}>
              Until:
            </Grid>
            <Grid item md={2}>
              {selectedParam.endDate}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={4.5}>
              Initial / Additional Claim:
            </Grid>
            <Grid
              item
              md={6}
            >{`${selectedParam.initialClm} / ${selectedParam.additionalClm}`}</Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Increment Frequency (# Wks) / By:
            </Grid>
            <Grid item md={4}>
              {`${selectedParam.incrementVal} / ${selectedParam.incrementFrequency}`}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid className="label-text" item md={2.25}>
          Comments:
        </Grid>
        <Grid className="view-params-comments-list" item md={9.75}>
          {selectedParam.comments?.split("<br/>")?.map((comment) => (
            <Typography className="view-params-comments-list-comment">
              {comment}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Stack>
  );
}

export default React.memo(ViewParametersData);
