import React from "react";
// import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ViewParametersData({ selectedParam }) {
  return (
    <Stack spacing={0.2}>
      <Grid container>
        <Grid item md={5}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Name:
            </Grid>
            <Grid item md={3}>
              {selectedParam.attributeName}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={7}>
          <Grid container>
            <Grid item md={4}>
            <Grid container>
            <Grid className="label-text" item md={8}>
            Automark:
            </Grid>
            <Grid item md={3}>
              {selectedParam.automarkInd}
            </Grid>
              </Grid>
            </Grid>

            <Grid item md={8}>
            <Grid container>
            <Grid className="label-text" item md={5}>
            Effective From:
            </Grid>
            <Grid item md={3}>
              {selectedParam.startDate}
            </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={5}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Weight:
            </Grid>
            <Grid item md={3}>
              {selectedParam.attributeWeight}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={7}>
          <Grid container>
            <Grid item md={4}>
            <Grid container>
            <Grid className="label-text" item md={8}>
            Attr format type:
            </Grid>
            <Grid item md={3}>
              {selectedParam.attrFormatType}
            </Grid>
              </Grid>
            </Grid>
            <Grid item md={8}>
            <Grid container>
            <Grid className="label-text" item md={5}>
            SAR Min Threshold:
            </Grid>
            <Grid item md={3}>
              {selectedParam.minThreshold}
            </Grid>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={5}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Remarks:
            </Grid>
            <Grid item md={3}>
              {selectedParam.remarks}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={7}>
          <Grid container>
            <Grid item md={4}>
            <Grid container>
            <Grid className="label-text" item md={8}>
            Date pattern 4 Ind:
            </Grid>
            <Grid item md={3}>
              {selectedParam.datePattern4Ind}
            </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default React.memo(ViewParametersData);
