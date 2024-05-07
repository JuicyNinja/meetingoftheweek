import {GroupChart, MemberChart } from "../components/adminpage";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
// import PageHeader from "../layouts/PageHeader";
// import MainPage from "../components/mainpage/MainPage";
// import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import ReferralChart from "../components/adminpage/ReferralChart";
import Counter from "../components/mainpage/Counter";
import { Grid } from "@mui/material";
import { MainHeader } from "../components/mainpage";
import CustomTable from "../components/common/Table";
import ReferralProducerTable from "../components/common/ReferralProducerTable";
import { useEffect, useState } from "react";
import { fetchReferralTotals } from "../services";
const AdminDashboard: React.FC = () => {
  const [totals, setTotals] = useState<any>();
  const totArr = [totals?.totReferral, totals?.totClosedReferral, `$${totals?.totgenerated}`, totals?.totClosedReferral, totals?.totUnclosedReferral];
  useEffect(() => {
    fetchRefTotal();
  }, []);
  const fetchRefTotal = async () => {
    try {
      const response =  await fetchReferralTotals();
      setTotals(response);
    } catch (error) {
      console.error("Error fetching group:", error);
    }
  };
  return (
    <>
      <ResponsiveAppBar />
      <MainHeader color={"#D9D9D9"} title={"Admin Dashboard"} hasPlus={false} />
      <Container maxWidth="xl">
        {/* <Transfer /> */}
        <Counter items={["Total Referrals", "Total Closed Referrals", "Total Revenue Generated  Referrals", "Total Perks Received","Total Unclosed Referrals"]} values={totArr}/>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
            <CustomTable />
            </Grid>
            <Grid item xs={12} md={8} >
              <ReferralProducerTable />
            </Grid>
        </Grid>
        
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ marginTop: 10 }}>
                <MemberChart />
            </Grid>
            <Grid item xs={12} md={6} sx={{ marginTop: 10 }}>
                <GroupChart />
            </Grid>
            <Grid item xs={12} md={12} sx={{ marginTop: 10 }}>
                <ReferralChart />
            </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default AdminDashboard;
