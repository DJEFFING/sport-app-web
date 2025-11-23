import { Container } from "@mui/material";
import { LeftDrawerOrganizer } from "../../components/leftDrawer/LeftDrawerOrganizer";
import TournamentTable from "../../components/tables/tournamentTable";
import { CreateTournament } from "./create-tournament/createTournament";

export const Tournament = () =>{
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
          <TournamentTable />
          <CreateTournament/>
         
        </Container>
      );
}