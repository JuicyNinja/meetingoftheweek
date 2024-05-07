import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { CustomAvatar } from ".";

const Perk = (props: any) => {
  const perk = props?.perk;
  return (
    <Card sx={{ width: "45%", maxWidth: "30rem", marginY: "1rem", padding:"1rem", borderRadius: 5 }}>
      <Grid container direction={"row"}>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {perk.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {perk.price}$
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {perk.desc}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {perk.terms}
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={6}
          justifyContent="center"
          alignItems="center"
        >
          <CustomAvatar width={"10rem"} height={"10rem"} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default Perk;
