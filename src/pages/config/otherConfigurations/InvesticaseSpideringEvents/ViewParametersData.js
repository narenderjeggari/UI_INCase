import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


// NMI Issue type - name
// type - type
// event number - speEventNumber
// short desc - 
// long desc - 
// origin cd - speOriginCd
// block home IND - speBlockHome
// home disallows IND - speHomeDisallow

// special certify ind -speSpecialCertiy
// inv action cd - speInvActionCd
// spe auto markers - speAutoMarkers
// frequency cd - speFreqCd
// other action cd - speOtherActionCd
// score - speScore
// spe_eff_from_dt - startDate
// spe_eff_to_dt - endDate

function ViewParametersData({ selectedParam }) {
  return (
    <Stack spacing={0.2}>
      <Grid container>
        <Grid item md={8}>
          <Grid container>
            <Grid className="label-text" item md={2.4}>
            NMI Issue type:
            </Grid>
            <Grid item md={9.6}>
              {selectedParam.name}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid className="label-text" item md={5}>
            Special Certify Ind:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speSpecialCertiy}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={8}>
          <Grid container>
            <Grid className="label-text" item md={2.4}>
              Type:
            </Grid>
            <Grid item md={9.6}>
              {selectedParam.type}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Inv Action CD:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speInvActionCd}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={8}>
          <Grid container>
            <Grid className="label-text" item md={2.4}>
            Event Number:
            </Grid>
            <Grid item md={9.6}>
              {selectedParam.speEventNumber}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid className="label-text" item md={5}>
            Spe Auto Markers:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speAutoMarkers}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={8}>
          <Grid container>
            <Grid className="label-text" item md={2.4}>
            Short Desc:
            </Grid>
            <Grid item md={9.6}>
              {/* {selectedParam.spaComments?.split("<br/>")?.map((comment) => (
                <Typography className="view-params-comments-list-comment">
                  {comment}
                </Typography>
              ))} */}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid className="label-text" item md={5}>
            Frequency CD:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speFreqCd}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
      <Grid item md={8}>
          <Grid container>
            <Grid className="label-text" item md={2.4}>
            Long Desc:
            </Grid>
            <Grid item md={9.6}>
              {/* {selectedParam.speEventNumber} */}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid className="label-text" item md={5}>
            Other Action CD:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speOtherActionCd}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={8}>
          <Grid container>
            <Grid className="label-text" item md={2.4}>
            Origin CD:
            </Grid>
            <Grid item md={9.6}>
              {selectedParam.speOriginCd}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid className="label-text" item md={5}>
            Score:
            </Grid>
            <Grid item md={6}>
              {selectedParam.speScore}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={8}>
          <Grid container>
            <Grid className="label-text" item md={2.4}>
            Block Home IND:
            </Grid>
            <Grid item md={9.6}>
              {selectedParam.speBlockHome}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Grid container>
            <Grid className="label-text" item md={5}>
              Effective Date:
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
            Home DisAllows IND:
            </Grid>
            <Grid item md={9.6}>
              {selectedParam.speHomeDisallow}
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

    </Stack>
  );
}

export default React.memo(ViewParametersData);
