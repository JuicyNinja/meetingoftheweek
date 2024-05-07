import { Suspense } from "react";
import { ConfirmModal, TaskList, TaskModal } from "..";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BaseSpiner from "../common/BaseSpinner";
import SearchFilter from "./SearchFilter";
import { Box } from "@mui/material";
interface MainPageProps{
  children:React.ReactNode;
}
const MainPage: React.FC<MainPageProps> = ({children}) => {
  return (
    <>
      {/* <Container maxWidth="lg" className="mt-5"> Assuming you want the container to be large */}
     
      <Suspense fallback={<BaseSpiner />}>
        {" "}
        {/* Suspense for lazy loading */}
        {children}
      </Suspense>
      <ReactQueryDevtools /> {/* Devtools for React Query */}
      
      {/* </Container> */}
      
    </>
  );
};

export default MainPage;
