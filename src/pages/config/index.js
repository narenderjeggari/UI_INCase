import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";

import theme from "../../theme/theme";

import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { styled } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { CONFIG_ITEMS } from "../../helpers/Constants";
import IndividualParameters from "./individualParameters";
import AutosetWeeklyWorkSearchRequirements from "./otherConfigurations/workSearchRequirements";
import AutosetWeeklyWorkSearchWaivers from "./otherConfigurations/workSearchWaivers";
import {
  dropdownAccordianHeadersURL,
  individualParamsTitleURL,
} from "../../helpers/Urls";
import client from "../../helpers/Api";
import { getMsgsFromErrorCode } from "../../helpers/utils";
import DropdownListItemData from "./dropdownLists";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  marginBottom: 7,
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      !props.expanded ? (
        <AddCircleIcon sx={{ fill: "#183084" }} />
      ) : (
        <RemoveCircleIcon sx={{ fill: "#183084" }} />
      )
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",

  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Configurations() {
  const alcCode = Number(window.category) || 4949;
  const [selectedConfig, setSelectedConfig] = useState([]);
  // const [selectedSubConfig, setSelectedSubConfig] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [configItems, setConfigItems] = useState(CONFIG_ITEMS);
  const [configurationsTitle, setConfigurationsTitle] = useState("");

  const handleConfigSelect = (panel) => (event, newExpanded) => {
    if (newExpanded) {
      setSelectedConfig([...selectedConfig, panel]);
    } else {
      const filtered = [...selectedConfig].filter((elem) => elem !== panel);
      setSelectedConfig([...filtered]);
    }
  };

  const renderAccordianDetails = (id, alcDecipherLabel) => {
    if (selectedConfig.includes(id)) {
      switch (id) {
        case "IndividualParameters":
          return <IndividualParameters />;
        case "Auto-set Minimum Weekly Work Search Requirements":
          return <AutosetWeeklyWorkSearchRequirements />;
        case "Auto-set Weekly Work Search Waivers":
          return <AutosetWeeklyWorkSearchWaivers />;
        default:
          return (
            <DropdownListItemData
              alcId={id}
              alcDecipherLabel={alcDecipherLabel}
            />
          );
      }
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    getConfigurationsTitle();
    getALCListForDropdown();
  }, []);

  const getConfigurationsTitle = async () => {
    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(`${individualParamsTitleURL}`)
          : await client.get(`${individualParamsTitleURL}${alcCode}`);

      setConfigurationsTitle(response.alvLongDescTxt);
    } catch (errorResponse) {
      setLoading(false);
      const newErrMsgs = getMsgsFromErrorCode(
        `GET:${process.env.REACT_APP_INDIVIDUAL_PARAM_TITLE_URL}`,
        errorResponse
      );
      setErrorMessages(newErrMsgs);
    }
  };

  const getALCListForDropdown = async () => {
    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(`${dropdownAccordianHeadersURL}`)
          : await client.get(`${dropdownAccordianHeadersURL}${alcCode}`);

      const items = [...configItems];
      const dropDownLists = items[1];
      dropDownLists.children = response.map((item) => {
        return {
          id: item.alcId,
          label: item.alcDescTxt,
          alcDecipherLabel: item.alcDecipherLabel,
        };
      });
      setConfigItems(items);
    } catch (errorResponse) {
      setLoading(false);
      const newErrMsgs = getMsgsFromErrorCode(
        `GET:${process.env.REACT_APP_DROPDOWN_ACCORDIAN_HEADERS_URL}`,
        errorResponse
      );
      setErrorMessages(newErrMsgs);
    }
  };

  return (
    <>
      <Stack sx={{ margin: "3rem 1rem" }}>
        <Typography
          variant="h4"
          style={{ marginTop: "0.5rem", fontSize: "1.5rem" }}
        >{`${configurationsTitle} Configurations`}</Typography>
        {CONFIG_ITEMS.map((item) => (
          <Accordion
            key={item.id}
            expanded={selectedConfig.includes(item.id)}
            onChange={handleConfigSelect(item.id)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              expanded={selectedConfig.includes(item.id)}
            >
              <Typography>{item.label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {item.children && item.children.length > 0 ? (
                item.children.map((subItem) => (
                  <Accordion
                    key={subItem.id}
                    expanded={selectedConfig.includes(subItem.id)}
                    onChange={handleConfigSelect(subItem.id)}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                      expanded={selectedConfig.includes(subItem.id)}
                    >
                      <Typography>{subItem.label}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {renderAccordianDetails(
                        subItem.id,
                        subItem.alcDecipherLabel
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <>{renderAccordianDetails(item.id)}</>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        mt={1}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {errorMessages.map((x) => (
          <div>
            <span className="errorMsg">*{x}</span>
          </div>
        ))}
      </Stack>

      <ToastContainer />
    </>
  );
}
