import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box} from "@mui/material";

const Transfer: React.FC = () => {
  const navigate = useNavigate();

  const onFunc = (url: string) => {
    navigate(url);
  }

  return (
    // <Container>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 10, mx: 0 }}>
        <Box sx={{ width: "15rem", height: "3rem" }}>
          <Button
            variant="contained"
            sx={{ width: "100%", height: "100%", bgcolor: "#C1FF72" }}
            onClick={() => onFunc('/users')} // Fix: Pass a function reference
          >
          </Button>
        </Box>
        <Box sx={{ width: "15rem", height: "3rem" }}>
          <Button
            variant="contained"
            sx={{ width: "100%", height: "100%", bgcolor: "#FED5D5" }}
            onClick={() => onFunc('/referrals')}
          ></Button>
        </Box>
        <Box sx={{ width: "15rem", height: "3rem" }}>
          <Button
            variant="contained"
            sx={{ width: "100%", height: "100%", bgcolor:"#38B6FF" }}
            onClick={() => onFunc('/groups')}
          ></Button>
        </Box>
        <Box sx={{ width: "15rem", height: "3rem" }}>
          <Button
            variant="contained"
            sx={{ width: "100%", height: "100%", bgcolor:"#FFDE59" }}
            onClick={() => onFunc('/owners')}
          ></Button>
        </Box>
        <Box sx={{ width: "15rem", height: "3rem" }}>
          <Button
            variant="contained"
            sx={{ width: "100%", height: "100%", bgcolor: "#D85BA8" }}
            onClick={() => onFunc('/meetings')}
          ></Button>
        </Box>
      </Box>
    // </Container>
  );
};

export default Transfer;
