import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
// import PageHeader from "../layouts/PageHeader";
import MainPage from "../components/mainpage/MainPage";
// import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Counter from "../components/mainpage/Counter";
import { MainHeader } from "../components/mainpage";
import { ConfirmModal, ReferralList, ReferralEditModal, useReferralTotalHook } from "../components/referral";

const ReferralDashboard: React.FC = () => {
  const {data: totals} = useReferralTotalHook();
const totValues = [totals?.totReferral, totals?.totClosedReferral, totals?.totUnclosedReferral];
  return (
    <>
      <ResponsiveAppBar />
      <MainHeader
        color={"#FED5D5"}
        title={"Referrals Dashboard"}
        hasPlus={false}
      />
      <Container maxWidth="xl">
        <Counter
          items={[
            "Total Referrals",
            "Total Closed Referrals",
            "Total Unclosed Referrals",
          ]}
          values={totValues}
        />
        <MainPage>
          <ReferralList />
        </MainPage>
      </Container>
      <ReferralEditModal />
      <ConfirmModal index={"referral"} />
    </>
  );
};
export default ReferralDashboard;
