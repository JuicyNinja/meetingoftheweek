import React from "react";
import { IconButton, AppBar, Typography, Box, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, changeModalStatus } from "../../store";
import { ModalStatus } from "../../types";
import { useNavigate } from "react-router-dom";

type ColorType =
  | "#C1FF72"
  | "#FED5D5"
  | "#38B6FF"
  | "#FFDE59"
  | "#D85BA8"
  | "#D9D9D9";

interface MainHeaderProps {
  color: ColorType;
  title: string;
  hasPlus: boolean;
  hasBack?: boolean;
}

const MainHeader: React.FC<MainHeaderProps> = ({ color, title, hasPlus, hasBack}) => {
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.OPEN,
        currentId: undefined,
      })
    );
  };
  const navigate = useNavigate();
  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: color }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            height: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {hasBack && (
            <IconButton
              onClick={handleBackPage}
              color="inherit"
              aria-label="Add Task"
            >
              <ArrowBackIcon style={{ color: "black" }} fontSize="large" />
            </IconButton>
          )}

          {!hasBack && (
            <Typography ></Typography>
          )}

          <Typography variant="h3" component="div" style={{ color: "black" }}>
            {title}
          </Typography>
          {hasPlus && (
            <IconButton
              onClick={handleOpenModal}
              color="inherit"
              aria-label="Add Task"
            >
              <AddIcon style={{ color: "black" }} fontSize="large" />
            </IconButton>
          )}
          {!hasPlus && (
            <Typography ></Typography>
          )}
        </Box>
      </Container>
    </AppBar>
  );
};

export default MainHeader;
