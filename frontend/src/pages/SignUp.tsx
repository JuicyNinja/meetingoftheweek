import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { register as registerFn} from "../services";
import { MuiTelInput } from 'mui-tel-input'
import { useState } from "react";

const defaultTheme = createTheme();

const SignUp = () => {
  const { register, handleSubmit} = useForm();

  const {mutate} = useMutation({
    mutationFn:registerFn
  });
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const handleTelInputChange = (value: string) => {
    setPhoneNumber(value);
  };


  const onSubmit=async (data: any)=>{
    try{
      await mutate(data);
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <>
      <ResponsiveAppBar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
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
                      id="zip"
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
                    <TextField
                      required
                      fullWidth
                      {...register("password")}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      {...register("confirmpassword")}
                      label="Confirm Password"
                      type="password"
                      id="confirmpassword"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Grid item xs={12} sx={{ my: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ my: 1 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SignUp;
