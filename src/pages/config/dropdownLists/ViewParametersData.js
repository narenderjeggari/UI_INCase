import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function ViewParametersData({ selectedParam, alcDecipherLabel }) {
  return (
    <Stack spacing={0.2}>
      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Name:
            </Grid>
            <Grid item md={8}>
              {selectedParam.alvShortDecTxt}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Spanish Name:
            </Grid>
            <Grid item md={8}>
              {selectedParam.alvSpShortDescTxt}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={6}>
          <div>
            <Grid container>
              {alcDecipherLabel && (
                <>
                  <Grid className="label-text" item md={4}>
                    {alcDecipherLabel}:
                  </Grid>
                  <Grid item md={8}>
                    {selectedParam.alvDecipherCode}
                  </Grid>
                </>
              )}
            </Grid>
          </div>
        </Grid>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Display On:
            </Grid>
            <Grid item md={8}>
              {selectedParam.alvDisplayOnDesc}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid container>
                
            </Grid> */}

      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Description:
            </Grid>
            <Grid item md={8}>
              {selectedParam.alvLongDescTxt}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Sort Order:
            </Grid>
            <Grid item md={8}>
              {selectedParam.alvSortOrderNbr}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Category Name:
            </Grid>
            <Grid item md={8}>
              {selectedParam.alvCategoryName}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <Grid container>
            <Grid className="label-text" item md={4}>
              Category Ref(SYS):
            </Grid>
            <Grid item md={8}>
              {selectedParam.alvCategoryCd}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid className="label-text" item md={2}>
          Comments:
        </Grid>
        <Grid className="view-params-comments-list" item md={9.75}>
          {selectedParam.alvComments?.split("<br/>")?.map((comment) => (
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
