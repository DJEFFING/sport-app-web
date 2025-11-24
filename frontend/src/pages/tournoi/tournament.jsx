import { Container } from "@mui/material";
import { LeftDrawerOrganizer } from "../../components/leftDrawer/LeftDrawerOrganizer";
import TournamentTable from "../../components/tables/tournamentTable";
import { CreateTournament } from "./create-tournament/createTournament";
import { useEffect } from "react";
import { getTournamentList } from "../../services/tournament/tounamentService";

export const Tournament = () => {
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        // setLoading(true);
        const data = await getTournamentList();
        // console.log("La liste des tournois :", data)
        // setTournaments(data);
        // setError(null);
      } catch (err) {
        // setError(err.message);
        console.error("Erreur:", err);
      } finally {
        // setLoading(false);
      }
    };

    fetchTournaments();
  }, []);
  return (
    <Container>
      <div className="row mt-5 mb-3">
        <div className="col-md-2">
          <LeftDrawerOrganizer />
        </div>
        <div className="col-md-8">
          <h2>Gestion des Tournois</h2>
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#createTournament"
          >
            Ajouter un Tournoi
          </button>
        </div>
      </div>
      <hr />
      <TournamentTable getTournamentList={getTournamentList} />
      <CreateTournament />
    </Container>
  );
};
