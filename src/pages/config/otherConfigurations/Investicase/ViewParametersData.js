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
            <Grid className="label-text" item md={3}>
              Attribute Name:
            </Grid>
            <Grid item md={3}>
              {selectedParam.attributeName}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={7}>
          <Grid container>
            <Grid item md={4}>
              <span className="label-text">Automark:</span>
              {selectedParam.automarkInd}
            </Grid>

            <Grid item md={8}>
              <span className="label-text">Effective From:</span>{" "}
              {selectedParam.startDate}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={5}>
          <Grid container>
            <Grid className="label-text" item md={3.2}>
              Attribute Weight:
            </Grid>
            <Grid item md={3}>
              {selectedParam.attributeWeight}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={7}>
          <Grid container>
            <Grid item md={4}>
              <span className="label-text" style={{ paddingRight: 3 }}>
                Attr format type:
              </span>
              {selectedParam.attrFormatType}
            </Grid>
            <Grid item md={8}>
              <span className="label-text">Attribute SAR Min Threshold:</span>
              {selectedParam.minThreshold}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={5}>
          <Grid container>
            <Grid className="label-text" item md={2}>
              Remarks:
            </Grid>
            <Grid item md={9}>
              {selectedParam.remarks}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={7}>
          <Grid container>
            <Grid item md={6}>
              <span className="label-text">Date pattern 4 Ind:</span>{" "}
              {selectedParam.datePattern4Ind}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default React.memo(ViewParametersData);
