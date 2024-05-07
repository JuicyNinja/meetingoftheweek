import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
// import PageHeader from "../layouts/PageHeader";
import MainPage from "../components/mainpage/MainPage";
// import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import Counter from '../components/mainpage/Counter';
import { MainHeader } from "../components/mainpage";
import {  ConfirmModal, useOwnerTotalHook} from "../components/owner";
import { OwnerList, OwnerModal } from "../components/owner";
const OwnerDashboard: React.FC = () =>{
    const {data: totals} = useOwnerTotalHook();
    const tots = [totals?.total, totals?.totalActive, totals?.totalInactive];
    return(
        <>
        <ResponsiveAppBar />
        <MainHeader color={"#FFDE59"} title={"Owners/Clan Leaders Dashboard"} hasPlus={false} />
        <Container maxWidth="xl">
        <Counter items={["Total Owners", "Total Active Owners", "Total Inactive Owners"]} values={tots}/>
        <MainPage>
                <OwnerList/>
            </MainPage>
        </Container>
        <OwnerModal />        
      <ConfirmModal index={"Owner"} />  
        </>
    );
}
export default OwnerDashboard;