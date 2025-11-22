import { Container } from "@mui/material";
import GameTable from "../../components/tables/gameTable";
import { CreateGame } from "./create-game/createGame";
import { LeftDrawerOrganizer } from "../../components/leftDrawer/LeftDrawerOrganizer";

export const Game = () => {
  return (
    <Container>
      <div className="row mt-5 mb-3">
        <div className="col-md-2">
          <LeftDrawerOrganizer />
        </div>
        <div className="col-md-8">
          <h2>Gestion des Matchs</h2>
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#createGame"
          >
            Ajouter un Match
          </button>
        </div><hr />
        <GameTable/>
      </div>
    <CreateGame/>
    </Container>
  );
};
