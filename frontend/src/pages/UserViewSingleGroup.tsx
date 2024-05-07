// import { ReferralProducerTable, Transfer } from "../components/adminpage";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
// import PageHeader from "../layouts/PageHeader";
// import MainPage from "../components/mainpage/MainPage";
// import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Counter from "../components/mainpage/Counter";
import { Grid, Typography } from "@mui/material";
import { MainHeader } from "../components/mainpage";
import { BusinessInfo } from "../components/UserProfileDashboard";
import { CustomAvatar } from "../components";
import { useParams } from "react-router-dom";
import { fetchReferralTotals, getGroup } from "../services";
import { IGroup } from "../types/group";
import { useEffect, useState } from "react";
import GroupMemberList from "../components/group/GroupMemberList";
import { ReferralCreateModal } from "../components/referral";

const UserViewSingleGroup: React.FC = () => {
  const { id } = useParams<{ id: string}>();
  const groupId = id? id:"";
  const [groupInfo, setGroupInfo] = useState<IGroup>();
  const [totals, setTotals] = useState<any>();
  const totArr = [totals?.totReferral, totals?.totClosedReferral, totals?.totgenerated, totals?.totClosedReferral]
  
  useEffect(() => {
    fetchGroupInfo();
    fetchRefTotal();
  }, []);

  const fetchGroupInfo = async () => {
    try {
      const response =  await getGroup(groupId);
      setGroupInfo(response);
    } catch (error) {
      console.error("Error fetching group:", error);
    }
  };
  const fetchRefTotal = async () => {
    try {
      const response =  await fetchReferralTotals(groupId);
      setTotals(response);
    } catch (error) {
      console.error("Error fetching group:", error);
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <MainHeader color={"#38B6FF"} title={"Group Infomation"} hasPlus={false} hasBack={true}/>
      <Container maxWidth="xl">
        <Grid container direction="row" sx={{ my: "1rem" }} spacing={2} justifyContent="space-around" alignItems="center">
          <Typography variant="h3" component="div" fontWeight="bold" style={{ textAlign: 'left' }}>
            {groupInfo?.name}
          </Typography>
          <Typography variant="h6" component="div" fontWeight="bold">
            Meeting Time: {groupInfo?.meetingInfo?.meetingtime}
          </Typography>
          <Typography variant="h6" component="div" fontWeight="bold">
            Meeting Link: {groupInfo?.meetingInfo?.meetinglink}
          </Typography>
        </Grid>
        <Grid container direction="row" spacing={2}>
          {/* BusinessInfo component */}
          <Grid
            item
            container
            xs={12}
            md={3}
            justifyContent="center"
            alignItems= "center" // Align the content to the center on medium screens
          >
            <BusinessInfo url={groupInfo?.logo}/>
          </Grid>

          {/* Counter component */}
          <Grid item xs={12} md={9}>
            <Counter
              items={[
                "Total Referrals",
                "Total Closed Referrals",
                "Total Revenue Generated Referrals",
                "Total Perks Received",
              ]}
              values={totArr}
            />
          </Grid>
        </Grid>

        <Grid container direction="row" sx={{ my: "1rem" }} spacing={2}>
          <Grid item xs={12} md={4}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={12} md={6}>
                <CustomAvatar width="12rem" height="12rem" url={groupInfo?.ownerInfo?.profilePhoto}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container direction="column" spacing={1}>
                  <Typography variant="h6" component="div" fontWeight="bold">
                    {groupInfo?.ownerInfo?.name}
                  </Typography>
                  <Grid item sx={{ fontWeight: 600 }}>
                    {groupInfo?.ownerInfo?.businessName}
                  </Grid>
                  <Grid item sx={{ fontWeight: 600 }}>
                    {groupInfo?.ownerInfo?.phone}
                  </Grid>
                  <Grid item sx={{ fontWeight: 600 }}>
                    {groupInfo?.ownerInfo?.email}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid item sx={{ textAlign: "left", mt: "3rem" }}>
              <Typography variant="h6" component="div" fontWeight="bold">
                Owner Message
              </Typography>
              <Typography>
                {groupInfo?.message}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <GroupMemberList />
      </Container>
      <ReferralCreateModal />
    </>
  );
};
export default UserViewSingleGroup;
