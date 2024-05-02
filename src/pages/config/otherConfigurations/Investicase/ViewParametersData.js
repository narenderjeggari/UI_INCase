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
        <Grid item md={4.5}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Name:
            </Grid>
            <Grid item md={8}>
              {selectedParam.name}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4.5}>
          <Grid container>
              <Grid container>
                <Grid className="label-text" item md={4}>
                  Automark:
                </Grid>
                <Grid item md={8}>
                  {selectedParam.spaAutoMark}
                </Grid>
              </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={6}>
              Effective From:
            </Grid>
            <Grid item md={6}>
              {selectedParam.startDate}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={4.5}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Weight:
            </Grid>
            <Grid item md={8}>
              {selectedParam.spaAttrWeight}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4.5}>
          <Grid container>
              {/* <Grid container> */}
                {/* <Grid className="label-text" item md={4}>
                  Attr format type:
                </Grid>
                <Grid item md={8}>
                  {selectedParam.spaFormatDesc}
                </Grid> */}
                 <Grid className="label-text" item md={4}>
                  Date pattern 4 Ind:
                </Grid>
                <Grid item md={8}>
                  {selectedParam.spaDp4ActiveInd}
                </Grid>
              {/* </Grid> */}
          </Grid>
        </Grid>

        <Grid item md={3}>
          <Grid container>
            <Grid className="label-text" item md={6}>
              {/* SAR Min Threshold: */}
            </Grid>
            <Grid item md={6}>
              {/* {selectedParam.spaMinThresholdValSarSubmit} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={4.5}>
          <Grid container>
            {/* <Grid className="label-text" item md={2}>
              Remarks:
            </Grid>
            <Grid item md={10}>
              {selectedParam.spaRemarks}
            </Grid> */}
             <Grid className="label-text" item md={4}>
                  Attr format type:
                </Grid>
                <Grid item md={8}>
                  {selectedParam.spaFormatDesc}
                </Grid>
          </Grid>
        </Grid>

        <Grid item md={4.5}>
          <Grid container>
              <Grid container>
                {/* <Grid className="label-text" item md={4}>
                  Date pattern 4 Ind:
                </Grid>
                <Grid item md={8}>
                  {selectedParam.spaDp4ActiveInd}
                </Grid> */}
              </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
        </Grid>
      </Grid>



      <Grid container>
        <Grid item md={4.5}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Comments:
            </Grid>
            <Grid item md={8}>
            {selectedParam.spaComments?.split("<br/>")?.map((comment) => (
            <Typography className="view-params-comments-list-comment">
             {comment}
            </Typography>
          ))}
              
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4.5}>
          {/* <Grid container>
              <Grid container>
                <Grid className="label-text" item md={4}>
                  Date pattern 4 Ind:
                </Grid>
                <Grid item md={8}>
                  {selectedParam.spaDp4ActiveInd}
                </Grid>
              </Grid>
          </Grid> */}
        </Grid>

        <Grid item md={3}>
        </Grid>
      </Grid>
      



    </Stack>
  );
}

export default React.memo(ViewParametersData);
