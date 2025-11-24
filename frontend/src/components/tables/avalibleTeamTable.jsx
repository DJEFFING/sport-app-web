import React, { useMemo, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { getAllAvalableTeams } from "../../services/team/teamService";
import { JoinRequestService } from "../../services/joinRequest/joinRequestService";


// Structure des données (à adapter si vous avez une interface TypeScript)
function createData(name, tournament_name, max_capacity, current_capacity) {
  return { name, tournament_name, max_capacity, current_capacity };
}

// Données d'exemple
const rows = [
  createData("Les Aigles", "Tournoi Hiver 2024", 20, 15),
  createData("Les Lions", "Coupe Régionale", 18, 18),
  createData("Tigers", "Open Amateur", 12, 5),
  createData("Phoenix", "Ligue Senior", 25, 22),
];

// NOTE: Ces valeurs doivent être gérées via l'état global ou le contexte d'authentification en production
const defaultUserId = "ea9cd278-c491-4688-bfcb-ecfc02a4df30";
const defaultMessage = "Bonjour, je souhaite joindre cette Equipe";

export default function AvalibleTeamTable() {
  const [teams, setTeams] = useState(rows);
  const [isSending, setIsSending] = useState(false); // État pour désactiver le bouton
  const joinRequestService = useMemo(() => new JoinRequestService(), []);


  useEffect(() => {
    const avalibleTeams = async () => {
      try {
        const response = await getAllAvalableTeams();
        console.log("la liste des Equipe disponible", response);
        // Assurez-vous que la réponse contient les champs attendus (name, tournament_name, etc.)
        setTeams(response);
      } catch (err) {
        console.error("Erreur lors de la récupération des équipes:", err);
        // Optionnel: setTeams([]) ou afficher un message d'erreur
      }
    };
    avalibleTeams();
  }, []);

  const makeJoinRequest = async (teamId) => {
    // Vérifier si une demande est déjà en cours
    if (isSending) return; 

    setIsSending(true);
    try {
      // Le corps de la requête est un objet contenant les variables
      const requestBody = {
          user_id: defaultUserId, 
          team_id: teamId, 
          message: defaultMessage 
      };

      const result = await joinRequestService.create(requestBody);
      console.log("Résultat de la demande d'adhésion du user", result);
      alert(`Demande d'adhésion envoyée à l'équipe ID: ${teamId} !`); // Utiliser un modal MUI en production

    } catch (err) {
      console.error("Erreur lors de la demande d'adhésion:", err);
      alert("Erreur lors de l'envoi de la demande. Veuillez réessayer.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 950 }} aria-label="simple table">
        <TableHead>
          <TableRow>
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
          {teams.map((row) => (
            // J'ai utilisé le nom comme clé par défaut, mais utilisez row.id si disponible
            <TableRow
              key={row.name} 
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* 1. Nom */}
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              
              {/* 2. Tournoi Parent */}
              <TableCell>{row.tournament_name}</TableCell>
              
              {/* 3. Capacité Max */}
              <TableCell align="right">{row.max_capacity}</TableCell>
              
              {/* 4. Nbr Joueurs */}
              <TableCell align="right">{row.current_capacity}</TableCell>

              {/* 5. Bouton Adhésion (CORRECTION ici) */}
              <TableCell align="center">
                <Button 
                    variant="contained" 
                    color="success" 
                    size="small" 
                    // CORRECTION: Envelopper l'appel dans une fonction fléchée
                    onClick={() => makeJoinRequest(row.id)} 
                    // Désactiver le bouton pendant l'envoi
                    disabled={isSending}
                >
                  {isSending ? 'Envoi...' : 'Faire demande'}
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