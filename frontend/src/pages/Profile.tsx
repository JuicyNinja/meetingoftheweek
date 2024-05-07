import { Container, Grid, Button, Stack, Typography } from "@mui/material";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import { CustomAvatar, Perk } from "../components";
import { MainHeader } from "../components/mainpage";
import {
  BusinessInfo
} from "../components/UserProfileDashboard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPerks, getUser } from "../services";
import { IUser } from "../types/user";
import { IPerk } from "../types/perk";
import { ReferralCreateModal } from "../components/referral";
import { changeModalStatus, useAppDispatch } from "../store";
import { ModalStatus } from "../types";

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string}>();
  const userId = id? id:"";
  const [userInfo, setUserInfo] = useState<IUser>();
  const [perks, setPerks] = useState<IPerk[]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchData();
    fetchPerkData();
  }, []);
  const fetchData = async () => {
    try {
      const userData = await getUser(userId);
      setUserInfo(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchPerkData = async () => {
    try {
      const response = await fetchPerks(userId);
      setPerks(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleSendReferral = () => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.OPEN,
        currentId: userId,
      })
    );
  };
  return (
    <>
      <ResponsiveAppBar />
      <MainHeader color={"#C1FF72"} title={"User Profile"} hasPlus={false} hasBack = {true} />
      <Container maxWidth="xl" sx={{ marginTop: "3rem" }}>
        <Grid container direction="row">
          {" "}
          {/* Enclose direction in quotes */}
          <Grid item xs={12} md={3} sx={{ marginTop: 10 }}>
            <Grid
              container
              direction="column"
              spacing={1}
              sx={{
                width: "20rem",
                marginTop: "0.5rem",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Grid container item alignItems="center" justifyContent="center">
                <CustomAvatar width="15rem" height="15rem" url={userInfo?.profilePhoto}/>
              </Grid>
              <Grid
                container
                item
                alignItems="center"
                direction="column"
                spacing={1}
              >
                <Grid item sx={{ fontWeight: 600 }}>
                  {userInfo?.name}
                </Grid>
                <Grid item sx={{ fontWeight: 600 }}>
                  {userInfo?.phone}
                </Grid>
                <Grid item sx={{ fontWeight: 600 }}>
                  {userInfo?.email}
                </Grid>
                {/* <Grid item sx={{ fontWeight: 600 }}>
                  <Button>Edit Profile</Button>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={9} sx={{ marginTop: 10 }}>
            <Grid
              container
              direction="column"
              spacing={1}
              sx={{
                width: "100%",
                marginTop: "0.5rem",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Grid container direction="row">
                <BusinessInfo url={userInfo?.businessLogo}/>
                <Grid item xs={12} md={6} marginLeft={2}>
                  
                  <Grid container direction="column" justifyContent="end" alignItems="begin" marginTop={2}>
                    <Typography variant="h5" align="left">{userInfo?.businessName}</Typography>
                    <Typography variant="body1" align="left">{userInfo?.businessWebsite}</Typography>
                    <Typography variant="body1" align="left">{userInfo?.businessPhone}</Typography>
                    <Typography variant="body1" align="left">{userInfo?.googleLink}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Stack spacing={2} direction="row" sx={{ marginTop: 2 }}>
                {" "}
                {/* Add marginTop style here */}
                <Button variant="contained" size="large" onClick={handleSendReferral}>
                  Send Referral
                </Button>{" "}
                {/* Increase size to large */}
              </Stack>

              <Grid container direction="row" justifyContent="space-around">
                {
                  perks && Array.isArray(perks) && perks.map((perk, index) => (
                    <Perk perk = {perk} key={index}/>
                ))
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <ReferralCreateModal/>
    </>
  );
};
export default Profile;
