import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Typography, Divider } from '@mui/material';
import { IReferral } from '../../types/referral';


const ProfileTable = (props: any) => {
  const referrals = props?.referrals;
  const user_id = props?.user_id;
  const rows = referrals && referrals.map((referral: IReferral) => ({
    id: referral._id,
    name: referral.sender._id !== user_id ? referral.sender?.name: referral.receiver?.name,
    phone: referral.sender._id !== user_id ? referral.sender?.phone: referral.receiver?.phone,
    email: referral.sender._id !== user_id ? referral.sender?.email: referral.receiver?.email,
    description: referral?.desc,
    sentreceived: referral.sender._id === user_id ? "Sent" : "Received",
    tofrom: referral.sender._id === user_id ? "To" : "From",
    pay: referral.payStatus? "Paid":"Unpaid",
    price: referral?.price
    // numberOfMembers: user.numberOfMembers,
  }));
  return (
    <>
      <Grid container spacing={2} sx={{paddingBottom: "100px"}}>
        <Grid item xs={12} sx={{ textAlign: 'left' }}>
          <Typography variant="h6">Referral</Typography>
          <Divider sx={{ borderTop: '2px solid #000' }} />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Full&nbsp;Name</TableCell>
                  <TableCell align="center" >Phone</TableCell>
                  <TableCell align="center" >Email</TableCell>
                  <TableCell align="center" >Description</TableCell>
                  <TableCell align="center" >Sent/Received</TableCell>
                  <TableCell align="center" >To/From</TableCell>
                  <TableCell align="center" >Unpaid/Paid</TableCell>
                  <TableCell align="center" >Estimated&nbsp;Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows && rows.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:not(:last-child)': { marginBottom: '8px' },
                    }}
                  >
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.sentreceived}</TableCell>
                    <TableCell align="center">{row.tofrom}</TableCell>
                    <TableCell align="center">{row.pay}</TableCell>
                    <TableCell align="center">${row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileTable;
