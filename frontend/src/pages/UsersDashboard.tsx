import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
// import PageHeader from "../layouts/PageHeader";
import MainPage from "../components/mainpage/MainPage";
// import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import Counter from '../components/mainpage/Counter';
import MainHeader from "../components/mainpage/MainHeader";
import { ConfirmModal, useUserTotalHook} from "../components/user";
import { UserList, UserModal } from "../components/user";

const UsersDashboard: React.FC = () =>{
    const {data: totals} = useUserTotalHook();
    const tots = [totals?.total, totals?.totalActive, totals?.totalInactive];

    return(
        <>
        <ResponsiveAppBar />
        <MainHeader color={"#C1FF72"} title={"Users Dashboard"} hasPlus={false} />
        <Container maxWidth="xl">
            <Counter items={["Total Users", "Total Active Users", "Total Inactive Users"]} values={tots}/>
            <MainPage>
                <UserList/>
            </MainPage>
        </Container>
        <UserModal />
        <ConfirmModal index={"user"} />
        </>
    );
}
export default UsersDashboard;