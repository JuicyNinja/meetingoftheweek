import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
// import PageHeader from "../layouts/PageHeader";
import MainPage from "../components/mainpage/MainPage";
// import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import { MainHeader } from "../components/mainpage";
import { ConfirmModal, MeetingList, MeetingModal } from "../components/meeting";

const Meeting: React.FC = () =>{
    return(
        <>
        <ResponsiveAppBar />
        <MainHeader color={"#D85BA8"} title={"Meetings"} hasPlus={true} />
        <Container maxWidth="xl">
            <MainPage>
                <MeetingList />
            </MainPage>
        </Container>
        <MeetingModal />
        <ConfirmModal index={"meeting"} /> 
        </>
    );
}
export default Meeting;