import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
// import PageHeader from "../layouts/PageHeader";
import MainPage from "../components/mainpage/MainPage";
// import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import { MainHeader } from "../components/mainpage";
import { UserMeetingList } from "../components/meeting";

const UserViewAllMeetings: React.FC = () =>{
    return(
        <>
        <ResponsiveAppBar />
        <MainHeader color={"#D85BA8"} title={"User View All Meetings"} hasPlus={false} />
        <Container maxWidth="xl">
            <MainPage>
                <UserMeetingList />
            </MainPage>
        </Container>
        </>
    );
}
export default UserViewAllMeetings;