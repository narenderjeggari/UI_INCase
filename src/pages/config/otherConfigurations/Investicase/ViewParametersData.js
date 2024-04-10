import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ViewParametersData({ selectedParam }) {
  return (
    <Stack spacing={0.2}>
      <Grid container>
        <Grid item md={7}>
          <Grid container>
            <Grid className="label-text" item md={3.4}>
              Scenario:
            </Grid>
            <Grid item md={8.6}>
              {selectedParam.scenario}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5}>
          <Grid container>
            <Grid item md={6}>
              <span className="label-text">Effective From:</span>{" "}
              {selectedParam.startDate}
            </Grid>
            <Grid item md={6}>
              <span className="label-text">Until:</span> {selectedParam.endDate}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={7}>
          <Grid container>
            <Grid className="label-text" item md={3.4}>
              Reason:
            </Grid>
            <Grid item md={8.6}>
              {selectedParam.reasonVal}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5}>
          <Grid container>
            <Grid item md={6}>
              <span className="label-text" style={{ paddingRight: 3 }}>Business Unit: </span>
              {selectedParam.businessUnit}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid className="label-text" item md={2}>
          Comments:
        </Grid>
        <Grid className="view-params-comments-list" item md={10}>
          {selectedParam.comments?.split("<br/>")?.map((comment) => (
            <Typography className="view-params-comments-list-comment">
              {comment}
            </Typography>
          ))}
        </Grid>
      </Grid>
      <Accordion className="other-config-view-params-accordian">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          style={{
            color: "#183084",
            fontWeight: "bold",
            fontSize: "0.8rem",
          }}
        >
          Additional Info
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <Stack direction="row">
              <Stack width="15%">
                <Typography className="label-text">Event:</Typography>
              </Stack>
              <Stack width="85%">
                <Typography>{selectedParam.event}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row">
              <Stack width="15%">
                <Typography className="label-text">Event Specifics:</Typography>
              </Stack>
              <Stack width="85%">
                <Typography>{selectedParam.eventSpecifics}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row">
              <Stack width="15%">
                <Typography className="label-text">Additional Ref:</Typography>
              </Stack>
              <Stack width="85%">
                <Typography>{selectedParam.addlRef}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row">
              <Stack width="15%">
                <Typography className="label-text">Special Actions:</Typography>
              </Stack>
              <Stack width="85%">
                <Typography>{selectedParam.splActions}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

export default React.memo(ViewParametersData);
