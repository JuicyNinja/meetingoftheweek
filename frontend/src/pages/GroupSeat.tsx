import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import MainPage from "../components/mainpage/MainPage";
import Container from '@mui/material/Container';
import Counter from '../components/mainpage/Counter';
import { MainHeader } from "../components/mainpage";
import { useGetGroupHook } from "../components/group";
import { useParams } from "react-router-dom";
import { ConfirmModal, SeatList, SeatModal } from "../components/seat";

const GroupSeat: React.FC = () =>{
    const { id } = useParams<{ id: string}>();
    const groupId = id? id:"";
    const {data: totals} = useGetGroupHook(groupId, true);

    return(
        <>
        <ResponsiveAppBar />
        <MainHeader color={"#38B6FF"} title={"Manage Seat of Group"} hasPlus={true} hasBack={true}/>
        <Container maxWidth="xl">
        <Counter items={["Number of Members", "Seat remaining"]} values={[totals?.counterMember.toString(),(totals?.groupSize - totals?.counterMember).toString()]}/>
        <MainPage>
            <SeatList />
        </MainPage>
        </Container>
        <SeatModal />
        <ConfirmModal index={"Seat"} />  
        </>
    );
}
export default GroupSeat;