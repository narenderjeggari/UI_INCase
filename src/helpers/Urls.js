const baseApiUrl =
  process.env.NODE_ENV === "local"
    ? ""
    : `${process.env.REACT_APP_BASE_API_URL}`;

const validateJWTURL = `${baseApiUrl}${process.env.REACT_APP_VALIDATE_JWT}`;
const refreshTokenURL = `${baseApiUrl}${process.env.REACT_APP_REFRESH_TOKEN_URL}`;
const accessTokenURL = `${baseApiUrl}${process.env.REACT_APP_ACCESS_TOKEN_URL}`;
const footerURL = `${baseApiUrl}${process.env.REACT_APP_FOOTER_URL}`;
const individualParamsListURL = `${baseApiUrl}${process.env.REACT_APP_INDIVIDUAL_PARAM_LIST_URL}`;
const individualParamsDetailsURL = `${baseApiUrl}${process.env.REACT_APP_INDIVIDUAL_PARAM_DETAILS_URL}`;
const individualParamsSaveURL = `${baseApiUrl}${process.env.REACT_APP_INDIVIDUAL_PARAM_SAVE_URL}`;
const individualParamDeleteURL = `${baseApiUrl}${process.env.REACT_APP_INDIVIDUAL_PARAM_DELETE_URL}`;
const individualParamsTitleURL = `${baseApiUrl}${process.env.REACT_APP_INDIVIDUAL_PARAM_TITLE_URL}`;
const individualParamsNamesListURL = `${baseApiUrl}${process.env.REACT_APP_INDIVIDUAL_PARAM_NAME_LIST_URL}`;
const individualParamsSubTableURL = `${baseApiUrl}${process.env.REACT_APP_INDIVIDUAL_PARAM_SUB_TABLE_URL}`;

const dropdownAccordianHeadersURL = `${baseApiUrl}${process.env.REACT_APP_DROPDOWN_ACCORDIAN_HEADERS_URL}`;
const dropdownAccordianItemListURL = `${baseApiUrl}${process.env.REACT_APP_DROPDOWN_ACCORDIAN_ITEM_LIST_URL}`;
const dropdownAccordianItemDetailsURL = `${baseApiUrl}${process.env.REACT_APP_DROPDOWN_ACCORDIAN_ITEM__DETAILS_URL}`;
const dropdownAccordianItemSaveURL = `${baseApiUrl}${process.env.REACT_APP_DROPDOWN_ACCORDIAN_ITEM_SAVE_URL}`;
const dropdownAccordianItemReorderURL = `${baseApiUrl}${process.env.REACT_APP_DROPDOWN_ACCORDIAN_ITEM_REORDER_URL}`;

const otherConfigWorkSearchReqURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_REQ_URL}`;
const otherConfigWorkSearchReqDetailsURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_REQ_DETAILS_URL}`;
const otherConfigWorkSearchReqSaveURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_REQ_SAVE_URL}`;
const otherConfigWorkSearchReqSubTableURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_REQ_SUB_TABLE_URL}`;
const otherConfigWorkSearchReqDeleteURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_REQ_DELETE_URL}`;

const otherConfigWorkSearchWaiversURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_WAIVERS_URL}`;
const otherConfigWorkSearchWaiversDetailsURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_WAIVERS_DETAILS_URL}`;
const otherConfigWorkSearchWaiversSaveURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_WAIVERS_SAVE_URL}`;
const otherConfigWorkSearchWaiversSubTableURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_WAIVERS_SUB_TABLE_URL}`;
const otherConfigWorkSearchWaiversDeleteURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_WAIVERS_DELETE_URL}`;

const otherConfigInvesticaseSearchURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SEARCH_URL}`;
const otherConfigInvesticaseDetailsURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_DETAILS_URL}`;
const otherConfigInvesticaseSaveURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SAVE_URL}`;
const otherConfigInvesticaseSubTableURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SUB_TABLE_URL}`;
const otherConfigInvesticaseDeleteURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_DELETE_URL}`;

const otherConfigInvesticaseSpideringEventsSearchURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SPIDERING_EVENTS_SEARCH_URL}`;
const otherConfigInvesticaseSpideringEventsDetailsURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SPIDERING_EVENTS_DETAILS_URL}`;
const otherConfigInvesticaseSpideringEventsSaveURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SPIDERING_EVENTS_SAVE_URL}`;
const otherConfigInvesticaseSpideringEventsSubTableURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SPIDERING_EVENTS_SUB_TABLE_URL}`;
const otherConfigInvesticaseSpideringEventsDeleteURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SPIDERING_EVENTS_DELETE_URL}`;

const otherConfigInvesticaseSpideringEventsReportListURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SPIDERING_REPORT_LIST_URL}`;
const otherConfigInvesticaseSpideringNmiIdURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SPIDERING_NMIID_URL}`;

const otherConfigInvesticaseIdentifyProofingQuestionsSearchURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_IDENTIFY_PROOFING_QUESTIONS_SEARCH_URL}`;
const otherConfigInvesticaseIdentifyProofingQuestionsDetailsURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_IDENTIFY_PROOFING_QUESTIONS_DETAILS_URL}`;

const otherConfigReasonsDropdownURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_REASON_DROPDOWN_URL}`;
const otherConfigBusinessUnitDropdownURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_BUSINESS_UNIT_DROPDOWN_URL}`;
const otherConfigInvesticaseSpideringALVIdOtherActionsURL = `${baseApiUrl}${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SPIDERING_ALVID_URL}`;

const alvDisplayOnListURL = `${baseApiUrl}${process.env.REACT_APP_ALV_DISPLAY_ON_LIST}`;

export {
  baseApiUrl,
  validateJWTURL,
  refreshTokenURL,
  accessTokenURL,
  footerURL,
  individualParamsListURL,
  individualParamsDetailsURL,
  individualParamsSaveURL,
  individualParamDeleteURL,
  otherConfigWorkSearchReqURL,
  otherConfigWorkSearchWaiversURL,
  dropdownAccordianHeadersURL,
  dropdownAccordianItemListURL,
  dropdownAccordianItemDetailsURL,
  dropdownAccordianItemSaveURL,
  dropdownAccordianItemReorderURL,
  alvDisplayOnListURL,
  otherConfigWorkSearchReqDetailsURL,
  otherConfigWorkSearchReqSaveURL,
  otherConfigWorkSearchWaiversDetailsURL,
  otherConfigWorkSearchWaiversSaveURL,
  otherConfigReasonsDropdownURL,
  otherConfigBusinessUnitDropdownURL,
  individualParamsTitleURL,
  individualParamsNamesListURL,
  individualParamsSubTableURL,
  otherConfigWorkSearchReqSubTableURL,
  otherConfigWorkSearchWaiversSubTableURL,
  otherConfigWorkSearchReqDeleteURL,
  otherConfigWorkSearchWaiversDeleteURL,
  otherConfigInvesticaseSearchURL,
  otherConfigInvesticaseDetailsURL,
  otherConfigInvesticaseSaveURL,
  otherConfigInvesticaseSubTableURL,
  otherConfigInvesticaseDeleteURL,
  otherConfigInvesticaseSpideringEventsSearchURL,
  otherConfigInvesticaseSpideringEventsDetailsURL,
  otherConfigInvesticaseSpideringEventsSaveURL,
  otherConfigInvesticaseSpideringEventsSubTableURL,
  otherConfigInvesticaseSpideringEventsDeleteURL,
  otherConfigInvesticaseSpideringEventsReportListURL,
  otherConfigInvesticaseSpideringALVIdOtherActionsURL,
  otherConfigInvesticaseSpideringNmiIdURL,
  otherConfigInvesticaseIdentifyProofingQuestionsSearchURL,
  otherConfigInvesticaseIdentifyProofingQuestionsDetailsURL
};
