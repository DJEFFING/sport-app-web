import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

function createData(competition, date, team1, score1, team2, score2, status) {
  return { competition, date, team1, score1, team2, score2, status };
}

const rows = [
  createData("Tournoi Printemps", "2024-05-10", "Paris FC", 2, "Lyon AS", 1, "terminé"),
  createData("Coupe Été", "2024-06-15", "Marseille SC", 3, "Nice OC", 3, "en cours"),
  createData("Challenge Automne", "2024-09-01", "Toulouse FC", null, "Bordeaux US", null, "à venir"),
  createData("Open Hiver", "2024-12-05", "Lille OSC", null, "Rennes SR", null, "à venir"),
  createData("Tournoi Jeunes", "2024-07-20", "Nantes FC", 4, "Strasbourg RC", 2, "terminé"),
];

function getWinner(row) {
  if (row.status === "à venir" || row.score1 === null || row.score2 === null) return "-";
  if (row.score1 > row.score2) return row.team1;
  if (row.score2 > row.score1) return row.team2;
  return "Égalité";
}

function getStatusChip(status) {
  if (status === "terminé") return <Chip label="Terminé" color="success" size="small" />;
  if (status === "en cours") return <Chip label="En cours" color="warning" size="small" />;
  return <Chip label="À venir" color="primary" size="small" />;
}

export default function GameTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="table des matchs">
        <TableHead>
          <TableRow>
            <TableCell>Compétition</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Équipe 1</TableCell>
            <TableCell sx={{ backgroundColor: "#e3f2fd" }}>Score 1</TableCell>
            <TableCell>Équipe 2</TableCell>
            <TableCell sx={{ backgroundColor: "#e3f2fd" }}>Score 2</TableCell>
            <TableCell sx={{ backgroundColor: "#fffff" }}>Gagnant</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell align="right">Modifier</TableCell>
            <TableCell align="right">Voir</TableCell>
            <TableCell align="right">Supprimer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">{row.competition}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.team1}</TableCell>
              <TableCell sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>
                {row.status === "à venir" ? "-" : row.score1}
              </TableCell>
              <TableCell>{row.team2}</TableCell>
              <TableCell sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>
                {row.status === "à venir" ? "-" : row.score2}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#fffff", fontWeight: "bold" }}>
                {getWinner(row)}
              </TableCell>
              <TableCell>
                {getStatusChip(row.status)}
              </TableCell>
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