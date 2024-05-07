import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
// import PageHeader from "../layouts/PageHeader";

import Container from "@mui/material/Container";
import { MainHeader } from "../components/mainpage";
import { BusinessInfo } from "../components/UserProfileDashboard";
import { CustomAvatar } from "../components";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IGroup } from "../types/group";
import { getGroup, getMeeting } from "../services";
import { IMeeting } from "../types/meeting";
import { useParams } from "react-router-dom";

const UserViewSingleMeetings: React.FC = () => {
  const { id } = useParams<{ id: string}>();
  const meetingId = id? id:"";
  const [groupInfo, setGroupInfo] = useState<IGroup>();
  const [meeting, setMeeting] = useState<IMeeting>();

  const fetchMeetingInfo = async () => {
    try {
      const response =  await getMeeting(meetingId);
      setMeeting(response);
      if (response.group) {
        try {
          const group = await getGroup(response.group);
          setGroupInfo(group);
        } catch (err) {
          console.error("Error fetching owners:", err);    
        }
      }
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };
  useEffect(() => {
    fetchMeetingInfo();
  }, []);
  return (
    <>
      <ResponsiveAppBar />
      <MainHeader
        color={"#D85BA8"}
        title={"Meeting Infomation"}
        hasPlus={false}
        hasBack={true}
      />
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          sx={{ marginTop: 5, alignItems: "center" }}
        >
          <Grid item xs={12} md={3}>
            <BusinessInfo url={groupInfo?.logo}/>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" component="div" fontWeight="bold">
              {groupInfo?.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <CustomAvatar width="12rem" height="12rem" url={groupInfo?.ownerInfo?.profilePhoto}/>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" component="div" fontWeight="bold">
              {groupInfo?.ownerInfo?.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={{textAlign:"left"}}>
             <Typography variant="h5" component="div" fontWeight="bold">
              {groupInfo?.location}
            </Typography>
            <Typography variant="h5" component="div" fontWeight="bold">
              {meeting?.meetingtime}
            </Typography>
            <Typography variant="h5" component="div" fontWeight="bold">
              {meeting?.meetinglink}
            </Typography>
            <Typography variant="h5" component="div" fontWeight="bold">
              {meeting?.meetingname}
            </Typography>
        </Grid>
      </Container>
    </>
  );
};
export default UserViewSingleMeetings;
