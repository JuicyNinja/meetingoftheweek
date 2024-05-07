import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordFn} from "../services";
import { MainHeader } from "../components/mainpage";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const ResetPassword = () => {
    const validationSchema = z.object({
        currentpassword: z.string(),
        password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
        confirmpassword: z.string().min(6, {message: 'Password must be at least 6 characters'})
    }).refine((data) => data.password === data.confirmpassword, {
        path: ['confirmpassword'],
        message: 'Passwords does not match'
    });
    type ValidationSchema = z.infer<typeof validationSchema>;
    const {register, handleSubmit, formState: {errors}} = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema)
    });
    const navigate = useNavigate();


  const {mutate} = useMutation({
    mutationFn:resetPasswordFn,
    onSuccess: () => {
        toast.success('Password is reseted successfully', {
            hideProgressBar: true,
            autoClose: 5000,
            type: "success",
            position: "top-right",
        });
        navigate(-1);
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
      <MainHeader
        color={"#D9D9D9"}
        title={"Reset Password"}
        hasPlus={false}
        hasBack={true}
      />
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
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
                    <TextField
                      required
                      fullWidth
                      {...register("currentpassword")}
                      label="Current Password"
                      type="password"
                      id="currentpassword"
                      autoComplete="currentpassword"
                      error={errors.currentpassword?.message != null}
                      helperText={errors.currentpassword?.message}
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
                      error={errors.password?.message != null}
                      helperText={errors.password?.message}
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
                      error={errors.confirmpassword?.message != null}
                      helperText={errors.confirmpassword?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ my: 4 }}
              >
                Change
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ResetPassword;
