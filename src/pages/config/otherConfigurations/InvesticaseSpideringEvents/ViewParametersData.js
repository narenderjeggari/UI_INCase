import React from "react";
// import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ViewParametersData({ selectedParam }) {
  console.log("selectedParam:::", selectedParam);
  return (
    <Stack spacing={0.2}>
      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={2}>
              Event Number:
            </Grid>
            <Grid item md={9}>
              {selectedParam.speNumber}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Type:
            </Grid>
            <Grid item md={6}>
              {selectedParam.nmiSubTypeDesc}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={6}>
              Special Certify IND:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speSpecialCertiy}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={2}>
              Origin Desc:
            </Grid>
            <Grid item md={9}>
              {selectedParam.speOriginCd}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Block Home IND:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speBlockHome}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={6}>
              Home DisAllows IND:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speHomeDisallow}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={2}>
              InvAction Desc:
            </Grid>
            <Grid item md={9}>
              {selectedParam.speInvActionDesc}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Other Action Code:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speOtherActionCd}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={6}>
              Frequency Code:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speFreqCd}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={2.2}>
              Short Desc:
            </Grid>
            <Grid item md={9}>
              {/* {selectedParam.short} */}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Spe Auto Markers:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speAutoMarkers}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={6}>
              Score:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speScore}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={2}>
              NMI Issue Type:
            </Grid>
            <Grid item md={9.8}>
              {selectedParam.name}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Effective Date:
            </Grid>
            <Grid item md={6}>
              {selectedParam.startDate}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={6}>
              Until:
            </Grid>
            <Grid item md={6}>
              {selectedParam.endDate}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid className="label-text" item md={1}>
          Long Desc:
        </Grid>
        <Grid item md={9}>
          {selectedParam.detail}
        </Grid>
      </Grid>
    </Stack>
  );
}

export default React.memo(ViewParametersData);
