import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';

function createData(
  name: string,
  calories: number,
  
) {
  return { name, calories };
}

const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
];

const RevenueTable = () => {
  return (
    <Sheet
      variant="solid"
      color="primary"
      invertedColors
      sx={{
        pt: 1,
        borderRadius: 'sm',
        transition: '0.3s',
        background: (theme) =>
          `linear-gradient(45deg, ${theme.vars.palette.primary[100]}, ${theme.vars.palette.primary[900]})`,
        '& tr:last-child': {
          '& td:first-child': {
            borderBottomLeftRadius: '8px',
          },
          '& td:last-child': {
            borderBottomRightRadius: '8px',
          },
        },
      }}
    >
      <Table stripe="odd" hoverRow>
        <caption>Nutrition of your favorite menus.</caption>
        <thead>
          <tr>
            <th style={{ width: '40%', textAlign: 'center' }}>Column width (40%)</th>
            <th style={{ textAlign: 'center' }}>Calories</th>
            
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.calories}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}

export default RevenueTable;
