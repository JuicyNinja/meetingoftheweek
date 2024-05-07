import Modal from "react-modal";
// import OutsideClickHandler from "react-outside-click-handler";
import { BaseSelectField, BaseToogle } from "../common";
import { useUserModalHook } from "./hooks";
import { changeModalStatus } from "../../store";

import { ModalStatus } from "../../types";
import { Box, Grid, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import ImageUpload from "../common/ImageUpload";
import { useEffect, useState } from "react";
import { IGroup } from "../../types/group";
import { fetchGroups } from "../../services";

const UserModal: React.FC = () => {
  const { isOpen, register, handleSubmit, onSubmit, dispatch, errors } = useUserModalHook();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [bphoneNumber, setBphoneNumber] = useState<string>('');
  const [groups, setGroups] = useState<IGroup[]>();
  const handleTelInputChange = (value: string) => {
    setPhoneNumber(value);
  };
  const handleBTelInputChange = (value: string) => {
    setBphoneNumber(value);
  };
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
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="User Modal"
      ariaHideApp={false}
      className="relative modal-container dark:bg-gray-800"
      overlayClassName="modal-overlay"
      style={{
        content: {
          width: '50%',
          minWidth: "800px"
        },
      }}
    >
      {/* <OutsideClickHandler
        onOutsideClick={() =>
          dispatch(
            changeModalStatus({
              modalStatus: ModalStatus.CLOSE,
              currentId: undefined,
            })
          )
        }
      > */}
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
              Create a new user
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  {...register("firstName")}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  {...register("lastName")}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
              <MuiTelInput
                {...register("phone")}
                required
                label="Phone Number"
                id="phone"
                fullWidth
                autoFocus
                defaultCountry="US"
                value={phoneNumber}
                onChange={handleTelInputChange}
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("city")}
                  required
                  fullWidth
                  id="city"
                  label="City"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("street")}
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("zipcode")}
                  required
                  fullWidth
                  id="zipcode"
                  label="Zipcode"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  {...register("email")}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <BaseSelectField
                  _id="group"
                  placeholder="Select group"
                  label="Group"
                  register={register}
                  error={errors.group?.message}
                  options={groups? groups : []}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="seat"
                  label="Group Seat"
                  {...register("seat")}
                  autoComplete="seat"
                />
              </Grid>
            </Grid>
            <Grid width={20}></Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("businessName")}
                  required
                  fullWidth
                  id="businessName"
                  label="Business Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
              <MuiTelInput
                {...register("businessPhone")}
                required
                label="Business Phone Number"
                id="businessPhone"
                fullWidth
                autoFocus
                defaultCountry="US"
                value={bphoneNumber}
                onChange={handleBTelInputChange}
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="businessEmail"
                  label="Business Email"
                  {...register("businessEmail")}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("businessWebsite")}
                  fullWidth
                  id="businessWebsite"
                  label="Business Website"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("googleLink")}
                  fullWidth
                  id="googleLink"
                  label="Google Business Link"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="flex-grow">Profile Photo</div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="flex-grow">Business Logo</div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <ImageUpload
                    _id="profilePhoto"
                    register={register}
                    width={100}
                    height={100}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <ImageUpload
                    _id="businessLogo"
                    register={register}
                    width={100}
                    height={100}
                  />
                </Box>
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
              Create
            </button>
          </div>
        </form>
      {/* </OutsideClickHandler> */}
    </Modal>
  );
};

export default UserModal;
