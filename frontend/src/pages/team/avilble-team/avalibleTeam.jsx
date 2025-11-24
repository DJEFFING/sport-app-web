import { Container } from "@mui/material";
import { LeftDrawerPlayer } from "../../../components/leftDrawer/LeftDrawerPlayer";
import AvalibleTeamTable from "../../../components/tables/avalibleTeamTable";
import { useMemo } from "react";
import {JoinRequestService} from "../../../services/joinRequest/joinRequestService"


// Ce composant affiche la liste des Equipe dont les effectifs ne sont pas encore complete
export const AvalibleTeam = () => {
  const joinRequest = useMemo(()=> new JoinRequestService(),[])

  

  return (
    <Container>
      <div className="row mt-5 mb-3">
        <div className="col-md-2">
          <LeftDrawerPlayer />
        </div>
        <div className="col-md-8">
          <h2>Liste des Equipes disponible</h2>
        </div>
        <div className="col-md-2">
          {/* <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#createTeam"
          >
            Ajouter une Equipe
          </button> */}
        </div>
      </div>
      <hr />
      < AvalibleTeamTable/>
    </Container>
  );
};
