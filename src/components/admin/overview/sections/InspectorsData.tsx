"use client";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "next/image";
import imgicon from "../../../../../public/images/admin/imgInspectors.png";

import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

import {
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  MenuItem,
} from "@mui/material";

const InspectorsData = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleMonthChange = (newDate:any) => {
    setSelectedMonth(newDate.month());
    setSelectedDate(newDate);
  };

  const [pickerOpen, setPickerOpen] = useState(false);

  const handlePickerClose = (event:any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Escape")
    ) {
      return;
    }
    setPickerOpen(false);
  };

  return (
    <Box height={"100%"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: theme.palette.secondary.light,
          }}
          variant="subtitle1"
        >
          Inspectores
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".3rem",
          }}
        >
          <IconButton
            sx={{ color: theme.palette.secondary.contrastText }}
            onClick={() => setPickerOpen((prev) => !prev)}
          >
            {!pickerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
          <Popper
            open={pickerOpen}
            anchorEl={null}
            transition
            disablePortal
            placement="bottom-end"
            sx={{ zIndex: 1, marginTop:38,marginLeft:'22rem'}}
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: "center top" }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handlePickerClose}>
                    <Box sx={{ p: 1 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="Select Month"
                          value={selectedDate}
                          onChange={handleMonthChange}
                          renderInput={(params:any) => (
                            <Typography {...params} sx={{ m: 0 }} />
                          )}
                          views={["month"]}
                          disableFuture
                        />
                      </LocalizationProvider>
                    </Box>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <Typography
            sx={{
              color: theme.palette.secondary.contrastText,
              fontSize: "12px",
            }}
          >
            {dayjs(selectedDate).format("MMMM YYYY")}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", height: "85%" }}>
        <Box
          sx={{
            width: "8rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: ".3rem",marginTop:'1rem' }}>
              <Box
                sx={{
                  width: "9px",
                  height: "9px",
                  backgroundColor: "#4FBD55",
                  borderRadius: "50%",
                }}
                className="circle"
              ></Box>
              <Typography
                sx={{
                  color: theme.palette.secondary.contrastText,
                  fontSize: "14px",
                }}
              >
                Activo
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary.light, fontWeight: 600 }}
            >
              8
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
              <Box
                sx={{
                  width: "9px",
                  height: "9px",
                  backgroundColor: "#E83D21",
                  borderRadius: "50%",
                }}
                className="circle"
              ></Box>
              <Typography
                sx={{
                  color: theme.palette.secondary.contrastText,
                  fontSize: "14px",
                }}
              >
                Inactivo
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary.light, fontWeight: 600 }}
            >
              6
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
              <Box
                sx={{
                  width: "9px",
                  height: "9px",
                  backgroundColor: "#26A4DA",
                  borderRadius: "50%",
                }}
                className="circle"
              ></Box>
              <Typography
                sx={{
                  color: theme.palette.secondary.contrastText,
                  fontSize: "14px",
                }}
              >
                Total
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary.light, fontWeight: 600 }}
            >
              7
            </Typography>
          </Box>
        </Box>
        <Box sx={{}}>
          <Image className="imglustracion" alt="imglustracion" src={imgicon} />
        </Box>
      </Box>
    </Box>
  );
};

export default InspectorsData;
