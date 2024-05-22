import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

function ViewParametersData({ selectedParam }) {
  return (
    <Stack spacing={0.2}>
      <Grid container>
        <Grid item md={5}>
          <Grid container>
            <Grid className="label-text" item md={3}>
              Question:
            </Grid>
            <Grid item md={9}>
              {selectedParam.spiQuestion}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3.5}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Effective Date:
            </Grid>
            <Grid item md={7}>
              {selectedParam.startDate}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3.5}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Until:
            </Grid>
            <Grid item md={8}>
              {selectedParam.endDate}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={5}>
          <Grid container>
            <Grid className="label-text" item md={3}>
              English:
            </Grid>
            <Grid item md={9}>
              {selectedParam.spiEnglish}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3.5}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Type:
            </Grid>
            <Grid item md={7}>
              {selectedParam.spiAlwaysRight}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3.5}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Source:
            </Grid>
            <Grid item md={8}>
              {selectedParam.spiSource}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={5}>
          <Grid container>
            <Grid className="label-text" item md={3}>
              Spanish:
            </Grid>
            <Grid item md={9}>
              {selectedParam.spiSpanish}
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={6}>
              Auto Increment Markers:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speAutoMarkers}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={8}>
              Score:
            </Grid>
            <Grid item md={4}>
              {selectedParam.speScore}
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>


      {/* <Grid container>
        <Grid className="label-text" item md={1.5}>
          Comments:
        </Grid>
        <Grid item md={9}>
          comments
          {selectedParam?.speComments}

          {selectedParam?.spaComments?.split("<br/>")?.map((comment) => (
                <Typography className="view-params-comments-list-comment">
                  {comment}
                </Typography>
              ))}
        </Grid>
      </Grid> */}
    </Stack>
  );
}

export default React.memo(ViewParametersData);
