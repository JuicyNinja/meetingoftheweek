import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import MainPage from "../components/mainpage/MainPage";
import Container from '@mui/material/Container';
import Counter from '../components/mainpage/Counter';
import { MainHeader } from "../components/mainpage";
import GroupList from "../components/group/GroupList";
import GroupModal from "../components/group/GroupModal";
import { ConfirmModal, useGroupTotalHook } from "../components/group";

const Groups: React.FC = () =>{

    const {data: totals} = useGroupTotalHook();

    return(
        <>
        <ResponsiveAppBar />
        <MainHeader color={"#38B6FF"} title={"Groups/Clan"} hasPlus={true} />
        <Container maxWidth="xl">
        <Counter items={["Total Groups", "Total Members"]} values={[totals?.totGroupNum.toString(),totals?.totMemberNum.toString()]}/>
        <MainPage>
                <GroupList/>
        </MainPage>
        </Container>
        <GroupModal />
        <ConfirmModal index={"Group"} />  
        </>
    );
}
export default Groups;