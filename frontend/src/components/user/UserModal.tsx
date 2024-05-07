import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
import { BaseSelectField, BaseToogle } from "../common";
import { useUserModalHook } from "./hooks";
import { changeModalStatus } from "../../store";

import { ModalStatus } from "../../types";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { IGroup, IMember } from "../../types/group";
import { fetchGroupMembers, fetchGroups } from "../../services";

const UserModal: React.FC = () => {
  const { isOpen, register, handleSubmit, reset, onSubmit, dispatch, errors , editableuser} = useUserModalHook();
  const [groups, setGroups] = useState<IGroup[]>();
  const [seats, setSeats] = useState<any[]>();
  const fetchGroupList = async () => {
    try {
      const response = await fetchGroups(1, 100000000);
      setGroups(response.data) ;
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }
  useEffect(() => {
    fetchGroupList();
    if (editableuser && editableuser.group) {
      fetchSeatList(editableuser.group);
    }
  }, [editableuser]);
  const fetchSeatList = async (group_id: string) => {
    try {
      const response = await fetchGroupMembers(group_id, "UNSEAT");
      const data = response && response.map((seat: IMember) => ({
        _id: seat.seat,
        name: seat.seat
      }));
      setSeats(data) ;
      reset({seat: editableuser.seat});
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }

  const handleGroupChange = (group_id: string) => {
    fetchSeatList(group_id);
  };
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="User Modal"
      ariaHideApp={false}
      className="relative modal-container dark:bg-gray-800"
      overlayClassName="modal-overlay"
      style={{
        content: {
          width: '400px',
          minWidth: "400px"
        },
      }}
    >
      <OutsideClickHandler
        onOutsideClick={() =>
          dispatch(
            changeModalStatus({
              modalStatus: ModalStatus.CLOSE,
              currentId: undefined,
            })
          )
        }
      >
        <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <button
            type="button"
            onClick={() =>
              dispatch(
                changeModalStatus({
                  modalStatus: ModalStatus.CLOSE,
                  currentId: undefined,
                })
              )
            }
            className="absolute text-white hover:text-gray-300 focus:outline-none top-3 right-3"
          >
            &#10006;
          </button>
          <div className="mb-5">
            <h1 className="flex justify-center mb-4 text-3xl font-bold text-gray-500 dark:text-gray-300">
              Change User State
            </h1>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <BaseSelectField
                  _id="group"
                  placeholder="Select group"
                  label="Group"
                  register={register}
                  error={errors.group?.message}
                  options={groups? groups : []}
                  onChange = {handleGroupChange}
                />
              </Grid>
              <Grid item xs={12}>
                <BaseSelectField
                  _id="seat"
                  placeholder="Select Seat"
                  label="Seat"
                  register={register}
                  error={errors.seat?.message}
                  options={seats? seats : []}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="flex-grow">Clan Status:</div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div> {/* Align ImageUpload to right */}
                  <BaseToogle register={register} status={"clanStatus"}/>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} paddingBlock={3}>
                <div className="flex-grow">Profile Status:</div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>
                  <BaseToogle register={register} status={"profileStatus"}/>
                </div>
              </Grid>
            </Grid>
          </Box>
          <div className="flex justify-center"> 
            <button
              type="submit"
              className="w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Update
            </button>
          </div>
        </form>
      </OutsideClickHandler>
    </Modal>
  );
};

export default UserModal;
