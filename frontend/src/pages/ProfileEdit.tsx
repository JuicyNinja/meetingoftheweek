import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SaveIcon from '@mui/icons-material/Save';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { fetchMe, updateUser} from "../services";
import { MuiTelInput } from 'mui-tel-input'
import { useEffect, useState } from "react";
import { MainHeader } from "../components/mainpage";
import AvatarChange from "../components/common/AvatarChange";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

const ProfileEdit = () => {

  const { register, handleSubmit, reset} = useForm();
  const {mutate} = useMutation({
    mutationFn:updateUser,
    onSuccess: () => {
      toast.success('Profile updated.', {
          hideProgressBar: true,
          autoClose: 5000,
          type: "success",
          position: "top-right",
      });
    },
    onError: (error:any) => {
        toast.error(`Error: ${error?.response?.data?.message}`, {
            hideProgressBar: true,
            autoClose: 5000,
            type: "error",
            position: "top-right",
        });
    },
  });
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [bphoneNumber, setBphoneNumber] = useState<string>('');
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [businessLogo, setBusinessLogo] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>();
  const handleTelInputChange = (value: string) => {
    setPhoneNumber(value);
  };
  const handleBTelInputChange = (value: string) => {
    setBphoneNumber(value);
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const fetchInfo = async () => {
    try {
      const response = await fetchMe();
      const { firstName, lastName, phone, city, street, zipcode, businessName, businessPhone, businessEmail, businessWebsite, googleLink, profilePhoto, businessLogo } = response;
      reset({
        firstName,
        lastName,
        city,
        street,
        zipcode,
        businessName,
        businessEmail,
        businessWebsite,
        googleLink
      });
      setPhoneNumber(phone);
      setBphoneNumber(businessPhone);
      setProfilePhoto(profilePhoto);
      setBusinessLogo(businessLogo);
      setUserInfo(response);
    } catch(error) {
      console.error("Error on fetch info: ", error)
    }
  }

  


  const onSubmit=async (data: any)=>{
    const params = {...data, profilePhoto: profilePhoto, businessLogo: businessLogo, phone: phoneNumber, businessPhone: bphoneNumber, _id: null};
    mutate({_id: userInfo._id, updatedUser: params});
  }
  return (
    <>
      <ResponsiveAppBar />
      <MainHeader
        color={"#D9D9D9"}
        title={"Edit Profile"}
        hasPlus={false}
        hasBack={true}
      />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <AvatarChange
                            _id="profilePhoto"
                            width={150}
                            height={150}
                            btntext="Change Profile Photo"
                            filename={profilePhoto}
                            onFileNameChange={setProfilePhoto}
                            />
                        </Grid>
                    </Grid>
                    <Grid width={20}></Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <AvatarChange
                            _id="businessLogo"
                            width={150}
                            height={150}
                            btntext="Change Business Logo"
                            filename={businessLogo}
                            onFileNameChange={setBusinessLogo}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                        marginTop:4
                    }}
                >
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="firstName"
                      {...register("firstName")}
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      InputLabelProps={{ shrink: true }}
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
                      autoComplete="lastName"
                      InputLabelProps={{ shrink: true }}
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
                      InputLabelProps={{ shrink: true }}
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
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...register("zipcode")}
                      required
                      fullWidth
                      id="zip"
                      label="Zipcode"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
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
                      InputLabelProps={{ shrink: true }}
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
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...register("businessWebsite")}
                      fullWidth
                      id="businessWebsite"
                      label="Business Website"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...register("googleLink")}
                      fullWidth
                      id="googleLink"
                      label="Google Business Link"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ my: 5, px: 4}}
                startIcon={<SaveIcon/>}
              >
                Save Change
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ProfileEdit;
