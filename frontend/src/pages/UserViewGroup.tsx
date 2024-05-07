import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
// import PageHeader from "../layouts/PageHeader";
import MainPage from "../components/mainpage/MainPage";
// import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import { MainHeader } from "../components/mainpage";
import { UserGroupList } from "../components/group";
import { ConfirmModal } from "../components/group";

const UserViewGroup: React.FC = () =>{
    return(
        <>
        <ResponsiveAppBar />
        <MainHeader color={"#38B6FF"} title={"Groups"} hasPlus={false} />
        <Container maxWidth="xl">
            <MainPage>
                <UserGroupList />
            </MainPage>
        </Container>
        <ConfirmModal index={"Group"} />  
        </>
    );
}
export default UserViewGroup;