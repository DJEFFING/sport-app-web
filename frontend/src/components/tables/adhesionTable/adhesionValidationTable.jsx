import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

function createData(team, player, status) {
  return { team, player, status };
}

const rows = [
  createData("Paris FC", "Jean Dupont", "en attente"),
  createData("Lyon AS", "Marie Martin", "acceptée"),
  createData("Marseille SC", "Ali Ben", "refusée"),
  createData("Nice OC", "Sophie Durand", "en attente"),
  createData("Toulouse FC", "Lucas Petit", "en attente"),
];

function getStatusChip(status) {
  if (status === "acceptée") return <Chip label="Acceptée" color="success" size="small" />;
  if (status === "refusée") return <Chip label="Refusée" color="error" size="small" />;
  return <Chip label="En attente" color="warning" size="small" />;
}

export default function AdhesionValidationTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="adhesion validation table">
        <TableHead>
          <TableRow>
            <TableCell>Équipe</TableCell>
            <TableCell>Joueur</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell align="center">Valider</TableCell>
            <TableCell align="center">Refuser</TableCell>
            <TableCell align="center">Infos joueur</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell>{row.team}</TableCell>
              <TableCell>{row.player}</TableCell>
              <TableCell>{getStatusChip(row.status)}</TableCell>
              <TableCell align="center">
                <Button variant="contained" color="success" size="small" disabled={row.status !== "en attente"}>
                  Valider
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" color="error" size="small" disabled={row.status !== "en attente"}>
                  Refuser
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" color="primary" size="small">
                  Infos
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}