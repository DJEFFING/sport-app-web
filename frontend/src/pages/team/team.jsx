import { Container } from "@mui/material";
import TeamTable from "../../components/tables/teamTable";
import { CreateTeam } from "./create-team/createTeam";
import { LeftDrawerOrganizer } from "../../components/leftDrawer/LeftDrawerOrganizer";
// import { LeftDrawerOrganizer } from "../../components/LeftDrawer/LeftDrawerOrganizer";

export const Team = () => {


  return (
    <Container>
      <div className="row mt-5 mb-3">
        <div className="col-md-2">
          <LeftDrawerOrganizer />
        </div>
        <div className="col-md-8">
          <h2>Gestion des Equipes</h2>
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#createTeam"
          >
            Ajouter une Equipe
          </button>
        </div>
      </div>
      <hr />
      <TeamTable />
      <CreateTeam />
    </Container>
  );
};
