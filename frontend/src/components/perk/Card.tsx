import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { changeModalStatus, useAppDispatch } from "../../store";
import { ModalStatus } from "../../types";

const PerkCard = (props: any) => {
  const perk = props.perk;
  const dispatch = useAppDispatch();
  const handleEditClick = () => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.EDIT,
        currentId: perk._id,
      })
    );
  };
  const handleDeleteClick = () => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.REMOVE,
        currentId: perk._id,
      })
    );
  };
  return (
    <Card sx={{ width: '100%', marginTop: "1rem", borderRadius: 5 }}> {/* Added borderRadius: 10 */}
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
        <Typography variant="h6">
          {perk.terms}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="small" onClick={handleEditClick}>Edit</Button>
        <Button size="small" onClick={handleDeleteClick}>Delete</Button>
      </CardActions>
    </Card>
  );
}

export default PerkCard;
