import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import { Droppable, Draggable, DragDropContext } from "@hello-pangea/dnd";
// import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";

import { styled } from "@mui/material/styles";
import CustomModal from "../../../components/customModal/CustomModal";
import client from "../../../helpers/Api";
import { serverErrorMessages } from "../../../helpers/Constants";
import {
  dropdownAccordianItemListURL,
  dropdownAccordianItemDetailsURL,
  alvDisplayOnListURL,
  dropdownAccordianItemReorderURL,
} from "../../../helpers/Urls";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { getMsgsFromErrorCode } from "../../../helpers/utils";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CachedIcon from "@mui/icons-material/Cached";
import theme from "../../../theme/theme";
import ViewParametersData from "./ViewParametersData";
import ModifyParametersData from "./ModifyParametersData";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { isUpdateAccessExist } from "../../../utils/cookies";
import HelpIcon from "@mui/icons-material/Help";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ReinstateIcon from "../../../components/Icons/ReInstateIcon";

export default function DropdownListItemData({ alcId, alcDecipherLabel }) {
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [selectedParam, setSelectedParam] = useState();
  const [alvDisplayOnListDetails, setAlvDsiplayOnListDetails] = useState([]);
  const [showViewParamModal, setShowViewParamModal] = useState(false);
  const [showEditParamModal, setShowEditParamModal] = useState(false);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [openSaveOrderSnackBar, setOpenSaveOrderSnackBar] = useState(false);
  const [enableSaveOrder, setEnableSaveOrder] = useState(false);

  const [showActiveEntries, setShowActiveEntries] = useState(true);
  const [showInActiveEntries, setShowInActiveEntries] = useState(false);

  const [active, setActive] = useState("Y");

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    needTotalCount: true,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [currentFilter, setCurrentFilter] = useState("Y");

  const columns = [
    { id: "alvShortDecTxt", label: "Options" },
    {
      id: "alvLongDescTxt",
      label: "Description",
    },
    ...(alcDecipherLabel
      ? [
          {
            id: "alvDecipherCode",
            label: alcDecipherLabel,
          },
        ]
      : []),
    {
      id: "alvDisplayOnDesc",
      label: "Display On",
    },
    {
      id: "alvSortOrderNbr",
      label: "Order",
      align: "right",
    },
  ];
  useEffect(() => {
    const payload = {
      // pagination: {
      //     pageNumber: 1, pageSize: 10,
      //     needTotalCount: true
      // },
      alcId,
      active: "Y",
    };
    //For dropdown, we fetch list of alcIds dynamically. // if DropdownLists from contacts, avoid calling api. refactor code later
    if (alcId !== "DropdownLists") {
      fetchData(payload);
    }
  }, [alcId]);

  useEffect(() => {
    let active = "";
    if (
      (showActiveEntries && showInActiveEntries) ||
      (!showActiveEntries && !showInActiveEntries)
    ) {
      active = "ALL";
    } else if (showActiveEntries) {
      active = "Y";
    } else if (showInActiveEntries) {
      active = "N";
    }
    setActive(active);
  }, [showActiveEntries, showInActiveEntries]);

  useEffect(() => {
    setEnableSaveOrder(differenceWith(data, originalData, isEqual).length > 0);
  }, [data]);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const renderColumn = (id, value, row) => {
    switch (id) {
      case "alvShortDecTxt":
        return (
          <Typography
            className={
              row.alvActiveInd === "Y"
                ? "clickable-active-text"
                : "clickable-inactive-text"
            }
            onClick={() => {
              fetchParamDetails(row.alvId, false);
            }}
          >
            {value}
          </Typography>
        );
      case "alvSortOrderNbr":
        return (
          <Typography>
            {value === 0 ? (
              <Tooltip title="Unsorted. Drag and drop to sort">UND</Tooltip>
            ) : (
              value
            )}
          </Typography>
        );
      default:
        return value;
    }
  };

  const fetchData = async (payload) => {
    setLoading(true);
    setErrorMessages([]);
    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(`${dropdownAccordianItemListURL}`)
          : await client.post(`${dropdownAccordianItemListURL}`, payload);
      setData(response.allowValAlvList);
      setOriginalData(response.allowValAlvList);
      setTotalCount(response.pagination.totalItemCount);
      setLoading(false);
      setCurrentFilter(active);
    } catch (errorResponse) {
      setLoading(false);
      const newErrMsgs = getMsgsFromErrorCode(
        `POST:${process.env.REACT_APP_DROPDOWN_ACCORDIAN_ITEM_LIST_URL}`,
        errorResponse,
      );
      setErrorMessages(newErrMsgs);
    }
  };

  // const handleChangePage = (event, newPage) => {
  //     setPage(newPage);

  //     const paginationPayload = {
  //         pageNumber: newPage + 1,
  //         pageSize: pagination.pageSize,
  //         needTotalCount: true
  //     };
  //     setPagination(paginationPayload);

  //     const payload = {
  //         // pagination: paginationPayload,
  //         alcId,
  //         active,
  //     };
  //     fetchData(payload);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(+event.target.value);
  //     setPage(0);

  //     const paginationPayload = {
  //         pageNumber: 1,
  //         pageSize: event.target.value,
  //         needTotalCount: true
  //     };
  //     setPagination(paginationPayload);

  //     const payload = {
  //         pagination: paginationPayload,
  //         alcId,
  //         active,
  //     };
  //     fetchData(payload);
  // };

  const refreshData = () => {
    if (showToolTipMsg) return;
    // setPage(0);

    // const paginationPayload = {
    //     pageNumber: 1,
    //     pageSize: 50,
    //     needTotalCount: true
    // };
    // setPagination(paginationPayload);

    const payload = {
      // pagination: paginationPayload,
      alcId,
      active,
    };
    if (alcId === "DropdownLists") return "";
    fetchData(payload);
  };

  const fetchParamDetails = async (alvId, showEditModal) => {
    setLoading(true);
    setErrorMessages([]);
    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(`${dropdownAccordianItemDetailsURL}`)
          : await client.get(`${dropdownAccordianItemDetailsURL}${alvId}`);
      const alvDisplayOnListRes =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(`${alvDisplayOnListURL}`)
          : await client.get(`${alvDisplayOnListURL}`);
      setSelectedParam(response);
      setAlvDsiplayOnListDetails(alvDisplayOnListRes);

      if (showEditModal) {
        setShowEditParamModal(true);
      } else {
        setShowViewParamModal(true);
      }

      setLoading(false);
    } catch (errorResponse) {
      setLoading(false);
      const newErrMsgs = getMsgsFromErrorCode(
        `GET:${process.env.REACT_APP_DROPDOWN_ACCORDIAN_ITEM__DETAILS_URL}`,
        errorResponse,
      );
      setErrorMessages(newErrMsgs);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedRows = JSON.parse(JSON.stringify([...data]));
    const [movedRow] = reorderedRows.splice(result.source.index, 1);
    reorderedRows.splice(result.destination.index, 0, movedRow);
    const startRowIndex = 1;
    reorderedRows.forEach((row, index) => {
      row.alvSortOrderNbr = startRowIndex + index;
    });
    setData([...reorderedRows]);
  };

  const reorderSave = async () => {
    // let difference = data.filter(x => {
    //     const index = originalData.findIndex(d => d.alvId === x.alvId && d.alvSortOrderNbr !== x.alvSortOrderNbr);
    //     return index >= 0;
    // });
    const difference = differenceWith(data, originalData, isEqual);
    const payload = difference.map((x) => {
      return {
        alvId: x.alvId,
        alvSortOrderNbr: x.alvSortOrderNbr,
      };
    });
    try {
      const response =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(`${dropdownAccordianItemReorderURL}`)
          : await client.post(`${dropdownAccordianItemReorderURL}`, {
              reorderAlvList: payload,
            });
      setOpenSaveOrderSnackBar(true);
      setEnableSaveOrder(false);
    } catch (errorResponse) {
      const newErrMsgs = getMsgsFromErrorCode(
        `GET:${process.env.REACT_APP_DROPDOWN_ACCORDIAN_ITEM__DETAILS_URL}`,
        errorResponse,
      );
      setErrorMessages(newErrMsgs);
    }
  };

  const handleSaveOrderClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSaveOrderSnackBar(false);
  };

  const enableSave = differenceWith(data, originalData, isEqual).length > 0;
  const showToolTipMsg =
    showActiveEntries === false && showInActiveEntries === false;

  return (
    <>
      <Stack>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography className="label-text">
              <span className="required">*</span>Display:
            </Typography>
            <FormControlLabel
              name="activeEntries"
              onChange={(event, checked) => {
                setShowActiveEntries(checked);
              }}
              control={<Checkbox checked={showActiveEntries} />}
              label="Active entries"
            />
            <FormControlLabel
              name="inactiveEntries"
              onChange={(event, checked) => {
                setShowInActiveEntries(checked);
              }}
              control={<Checkbox checked={showInActiveEntries} />}
              label="Inactive entries"
            />

            <Tooltip
              title={
                showToolTipMsg
                  ? "Please select atleast one checkbox"
                  : "Refresh Data"
              }
              placement="top"
            >
              <CachedIcon
                disabled={true}
                sx={{ cursor: "pointer" }}
                fontSize="medium"
                color="primary"
                onClick={refreshData}
              />
            </Tooltip>
          </Stack>
          {currentFilter === "Y" && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Tooltip
                title={
                  "Please drag and drop the rows below to change the order of configurations. After reordering, click the 'Save Order' button to save your changes."
                }
                placement="top"
              >
                <HelpIcon color="primary" fontSize="large" />
              </Tooltip>
              <Button
                onClick={reorderSave}
                variant="contained"
                disabled={!enableSaveOrder}
              >
                Save Order
              </Button>
            </Stack>
          )}

          <Snackbar
            open={openSaveOrderSnackBar}
            autoHideDuration={6000}
            onClose={handleSaveOrderClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            style={{ top: "80px" }}
          >
            <MuiAlert
              onClose={handleSaveOrderClose}
              severity="success"
              sx={{ backgroundColor: "#4CAF50" }}
            >
              Order Saved.
            </MuiAlert>
          </Snackbar>
        </Stack>

        <Paper square elevation={10} sx={{ width: "100%", overflow: "hidden" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="table">
              {(provided) => (
                <TableContainer
                  component={Paper}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Table size="small" stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              fontWeight: "bold",
                              backgroundColor: "#183084",
                              color: "white",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                        <TableCell
                          style={{
                            minWidth: 150,
                            fontWeight: "bold",
                            backgroundColor: "#183084",
                            color: "white",
                          }}
                        >
                          <Stack
                            spacing={theme.spacing(1)}
                            alignItems="center"
                            justifyContent="center"
                          >
                            Actions
                          </Stack>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => {
                        return (
                          <Draggable
                            draggableId={row.alvId.toString()}
                            index={index}
                            key={row.alvId}
                            isDragDisabled={currentFilter !== "Y"}
                          >
                            {(provided, snapshot) => (
                              <StyledTableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  backgroundColor: snapshot.isDragging
                                    ? "lightblue"
                                    : "white", // Optional: Change background color while dragging
                                  boxShadow: snapshot.isDragging
                                    ? "0 4px 6px rgba(0, 0, 0, 0.1)"
                                    : "none", // Optional: Add a shadow while dragging
                                  cursor: "grab", // Add cursor style for dragging
                                }}
                              >
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {renderColumn(column.id, value, row)}
                                    </TableCell>
                                  );
                                })}
                                <TableCell padding="checkbox">
                                  <Stack
                                    spacing={theme.spacing(1)}
                                    alignItems="center"
                                  >
                                    {row.alvActiveInd === "Y" && (
                                      <Tooltip title="Edit" placement="top">
                                        <IconButton
                                          disabled={!isUpdateAccessExist()}
                                        >
                                          <EditNoteIcon
                                            sx={{ cursor: "pointer" }}
                                            fontSize="medium"
                                            {...(isUpdateAccessExist() && {
                                              color: "primary",
                                            })}
                                            onClick={(event) => {
                                              fetchParamDetails(
                                                row.alvId,
                                                true,
                                              );

                                              event.preventDefault();
                                              event.stopPropagation();
                                            }}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                    {row.alvActiveInd === "N" && (
                                      <ReinstateIcon
                                        sx={{ cursor: "pointer" }}
                                        fontSize="medium"
                                        tooltipPlacement="left"
                                        onClick={(event) => {
                                          fetchParamDetails(row.alvId, true);
                                          event.preventDefault();
                                          event.stopPropagation();
                                        }}
                                      />
                                    )}
                                  </Stack>
                                </TableCell>
                              </StyledTableRow>
                            )}
                          </Draggable>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Droppable>
          </DragDropContext>
          {/* <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
        </Paper>
      </Stack>

      <CustomModal
        open={showViewParamModal}
        onClose={() => setShowViewParamModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        title={`View ${selectedParam?.alvShortDecTxt}`}
        maxWidth="md"
      >
        <DialogContent>
          <Stack mt={3}>
            <ViewParametersData
              selectedParam={selectedParam}
              alcDecipherLabel={alcDecipherLabel}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ margin: 2 }}>
          <Button
            variant="contained"
            onClick={() => setShowViewParamModal(false)}
          >
            Close
          </Button>
        </DialogActions>
      </CustomModal>

      <CustomModal
        open={showEditParamModal}
        onClose={() => setShowEditParamModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        title={`Modify ${selectedParam?.alvShortDecTxt}`}
        maxWidth="md"
      >
        <ModifyParametersData
          selectedParam={selectedParam}
          alcDecipherLabel={alcDecipherLabel}
          alvDisplayOnListDetails={alvDisplayOnListDetails}
          closeModalPopup={(refresh = false) => {
            if (refresh) {
              refreshData();
            }
            setShowEditParamModal(false);
          }}
        />
      </CustomModal>
    </>
  );
}
