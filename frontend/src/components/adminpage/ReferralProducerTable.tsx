import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';

function createData(
  name: string,
  calories: number,
  fat: number,
) {
  return { name, calories, fat };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

const ReferralProducerTable = () => {
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
          `linear-gradient(45deg, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.primary[400]})`,
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
            <th style={{ textAlign: 'center' }}>Fat&nbsp;(g)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.calories}</td>
              <td>{row.fat}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}

export default ReferralProducerTable;
