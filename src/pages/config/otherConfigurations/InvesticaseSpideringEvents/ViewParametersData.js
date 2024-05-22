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
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={3}>
              Event Number:
            </Grid>
            <Grid item md={9}>
              {selectedParam.speNumber}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={6}>
              Type:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speType === "E" ? "Event" : "Default"}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={8}>
              Special Rules on Certification:
            </Grid>
            <Grid item md={4}>
              {selectedParam.speSpecialCertify}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={3}>
              Origin:
            </Grid>
            <Grid item md={9}>
              {selectedParam.speOriginCd}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={6}>
              Block Home Page:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speBlockHome}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={8}>
              DisAllows Home Page Actions:
            </Grid>
            <Grid item md={4}>
              {selectedParam.speHomeDisallows}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={3}>
              Investicase Action:
            </Grid>
            <Grid item md={9}>
              {selectedParam.speInvActionDesc}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={6}>
              Other Actions:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speOtherActionAlc}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={8}>
              Frequency:
            </Grid>
            <Grid item md={4}>
              {selectedParam.speFreqCd}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={3}>
              Description:
            </Grid>
            <Grid item md={9}>
              {selectedParam.description}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
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
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={3}>
              Issue Type/Sub Type:
            </Grid>
            <Grid item md={9}>
              {selectedParam.nmiDesc}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={6}>
              Effective Date:
            </Grid>
            <Grid item md={6}>
              {selectedParam.startDate}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={8}>
              Until:
            </Grid>
            <Grid item md={4}>
              {selectedParam.endDate}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid className="label-text" item md={1.5}>
          Detail:
        </Grid>
        <Grid item md={9}>
          {selectedParam.detail}
        </Grid>
      </Grid>

      <Grid container>
        <Grid className="label-text" item md={1.5}>
        Comments:
        </Grid>
        <Grid item md={9}>
          {/* comments */}
          {selectedParam?.speComments}

          {/* {selectedParam?.spaComments?.split("<br/>")?.map((comment) => (
                <Typography className="view-params-comments-list-comment">
                  {comment}
                </Typography>
              ))} */}
        </Grid>
      </Grid>
    </Stack>
  );
}

export default React.memo(ViewParametersData);
