import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, sport, city, startDate) {
  return { name, sport, city, startDate };
}

const rows = [
  createData("Tournoi Printemps", "Football", "Paris", "2024-05-10"),
  createData("Coupe Été", "Basketball", "Lyon", "2024-06-15"),
  createData("Challenge Automne", "Handball", "Marseille", "2024-09-01"),
  createData("Open Hiver", "Rugby", "Toulouse", "2024-12-05"),
  createData("Tournoi Jeunes", "Tennis", "Nice", "2024-07-20"),
];

export default function TournamentTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom du tournoi</TableCell>
            <TableCell>Sport</TableCell>
            <TableCell>Ville</TableCell>
            <TableCell>Date de début</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Show</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.sport}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.startDate}</TableCell>
              <TableCell align="right">
                <button className="btn btn-warning">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </TableCell>
              <TableCell align="right">
                <button className="btn btn-primary">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </TableCell>
              <TableCell align="right">
                <button className="btn btn-danger">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}