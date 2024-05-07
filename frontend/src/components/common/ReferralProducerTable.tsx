
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchReferralTotalByUser } from '../../services';

const useGetReferralTotalByUserHook = () => useQuery({
  queryKey: ["getReferralTotalByUser"],
  queryFn: async (): Promise<any> => {
      try {
          const data = await fetchReferralTotalByUser();
          return data;
      } catch (error) {
          throw new Error('Failed to fetch recent member totals');
      }
  }
});

const ReferralProducerTable = () => {
  const {data: allData, isPending, isError} = useGetReferralTotalByUserHook();
  const [showAll, setShowAll] = useState(false);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(showAll ? allData?.slice(0, 4): allData);
  }, [allData, isPending, isError]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setRows(showAll ? allData?.slice(0, 4): allData);
  };


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "15rem" }} aria-label="caption table">
        { allData && allData?.length > 4 &&
          <caption>Top Revenue Group (All Time)<Button sx={{marginLeft:"36rem"}} size={"small"} onClick={toggleShowAll} variant="contained" color="primary">{showAll ? 'Show Less' : 'Show All'}</Button></caption>
        }
        <TableHead>
          <TableRow>
          <TableCell align='center'>Full Name</TableCell>
            <TableCell align='center'>Group</TableCell>
            <TableCell align="center">Revenue</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row: any, index) => (
            <TableRow key={index}>
              <TableCell align='center' component="th" scope="row">
                {row?.user}
              </TableCell>
              <TableCell align='center' component="th" scope="row">
                {row?.group}
              </TableCell>
              <TableCell align="center">{`$${row?.totalPrice}`}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ReferralProducerTable;