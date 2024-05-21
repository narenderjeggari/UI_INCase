import React from "react";
import Typography from "@mui/material/Typography";
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
        <Grid item md={8}>
          <Grid container>
            <Grid className="label-text" item md={2.4}>
              Name:
            </Grid>
            <Grid item md={9.6}>
              {selectedParam.name}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Automark:
            </Grid>
            <Grid item md={6}>
              {selectedParam.spaAutoMark}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={8}>
          <Grid container>
            <Grid className="label-text" item md={2.4}>
              Attr format type:
            </Grid>
            <Grid item md={9.6}>
              {selectedParam.spaFormatDesc}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Weight:
            </Grid>
            <Grid item md={6}>
              {selectedParam.spaAttrWeight}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={8}>
          <Grid container>
            <Grid className="label-text" item md={2.4}>
              Remarks:
            </Grid>
            <Grid item md={9.6}>
              {selectedParam.spaRemarks}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Effective From:
            </Grid>
            <Grid item md={6}>
              {selectedParam.startDate}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={8}>
          <Grid container>
            <Grid className="label-text" item md={2.4}>
              Comments:
            </Grid>
            <Grid item md={9.6}>
              {selectedParam.spaComments?.split("<br/>")?.map((comment) => (
                <Typography className="view-params-comments-list-comment">
                  {comment}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Until:
            </Grid>
            <Grid item md={6}>
              {selectedParam.endDate}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={8}></Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Date pattern 4 Ind:
            </Grid>
            <Grid item md={6}>
              {selectedParam.spaDp4ActiveInd}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default React.memo(ViewParametersData);
