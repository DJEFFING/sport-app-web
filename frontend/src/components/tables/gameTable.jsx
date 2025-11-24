import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { getAllgames } from "../../services/game/gameService";
import { useEffect, useState } from "react";


function createDat2(tournament_name, date, location, team_a_name, score_a, team_b_name, score_b, status) {
  return { tournament_name, date, location, team_a_name, score_a, team_b_name, score_b, status };
}

const rows = [
  createDat2(
    "Tournoi Printemps",
    "2024-05-10",
    "Paris FC",
    2,
    "Lyon AS",
    1,
    "terminé"
  ),
  createDat2(
    "Coupe Été",
    "2024-06-15",
    "Marseille SC",
    3,
    "Nice OC",
    3,
    "en cours"
  ),
  createDat2(
    "Challenge Automne",
    "2024-09-01",
    "Toulouse FC",
    null,
    "Bordeaux US",
    null,
    "à venir"
  ),
  createDat2(
    "Open Hiver",
    "2024-12-05",
    "Lille OSC",
    null,
    "Rennes SR",
    null,
    "à venir"
  ),
  createDat2(
    "Tournoi Jeunes",
    "2024-07-20",
    "Nantes FC",
    4,
    "Strasbourg RC",
    2,
    "terminé"
  ),
];

function getWinner(row) {
  if (row.status === "à venir" || row.score_a === null === null || row.score_b === null)
    return "-";
  if (row.score_a > row.score_b) return row.team_a_name;
  if (row.score_b > row.score_a) return row.team_b_name;
  return "Égalité";
}

function getStatusChip(status) {
  if (status === "terminé")
    return <Chip label="Terminé" color="success" size="small" />;
  if (status === "en cours")
    return <Chip label="En cours" color="warning" size="small" />;
  return <Chip label="À venir" color="primary" size="small" />;
}

export default function GameTable() {
  const [games, setGames] = useState(rows)

  useEffect(() => {
    const getGames = async () => {
      const response = await getAllgames();
      console.log("La liste des Match du backend : ",response)
      setGames(response.results);
      // setTeams(response.results);
    };
    getGames();
  }, []);

  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="table des matchs">
        <TableHead>
          <TableRow>
            <TableCell>Compétition</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Localisation</TableCell>
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
          {games.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.tournament_name}
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.team_a_name}</TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}
              >
                {row.score_a === null ? "-" : row.score_a}
              </TableCell>
              <TableCell>{row.team_b_name}</TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}
              >
                {row.score_b === null ? "-" : row.score_b}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#fffff", fontWeight: "bold" }}>
                {getWinner(row)}
              </TableCell>
              <TableCell>{getStatusChip(row.status)}</TableCell>
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
