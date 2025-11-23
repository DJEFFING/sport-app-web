import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button"; // N'oubliez pas cet import !

// 1. On définit les données qui correspondent à vos colonnes
function createData(nom, tournoiParent, capaciteMax, nbrInscrits) {
  return { nom, tournoiParent, capaciteMax, nbrInscrits };
}

// 2. On crée des exemples de données réalistes
const rows = [
  createData("Les Aigles", "Tournoi Hiver 2024", 20, 15),
  createData("Les Lions", "Coupe Régionale", 18, 18),
  createData("Tigers", "Open Amateur", 12, 5),
  createData("Phoenix", "Ligue Senior", 25, 22),
];

export default function AvalibleTeamTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 950 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* J'ai corrigé "Mon" en "Nom" */}
            <TableCell>Nom</TableCell>
            <TableCell>Tournoi parent</TableCell>
            <TableCell align="right">Capacité Max</TableCell>
            <TableCell align="right">Nbr joueurs</TableCell>
            <TableCell align="center">Adhésion</TableCell>
            <TableCell align="center">Infos Compétition</TableCell>
            <TableCell align="center">Infos Équipe</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.nom}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* 1. Nom */}
              <TableCell component="th" scope="row">
                {row.nom}
              </TableCell>
              
              {/* 2. Tournoi Parent */}
              <TableCell>{row.tournoiParent}</TableCell>
              
              {/* 3. Capacité Max (aligné à droite comme le header) */}
              <TableCell align="right">{row.capaciteMax}</TableCell>
              
              {/* 4. Nbr Joueurs (aligné à droite) */}
              <TableCell align="right">{row.nbrInscrits}</TableCell>

              {/* 5. Bouton Adhésion (aligné au centre) */}
              <TableCell align="center">
                <Button variant="contained" color="success" size="small">
                  Faire demande
                </Button>
              </TableCell>

              {/* 6. Bouton Info Tournoi (aligné au centre) */}
              <TableCell align="center">
                <Button variant="outlined" color="warning" size="small">
                  Info Tournoi
                </Button>
              </TableCell>

              {/* 7. Bouton Info Équipe (aligné au centre) */}
              <TableCell align="center">
                <Button variant="outlined" color="primary" size="small">
                  Info Équipe
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}