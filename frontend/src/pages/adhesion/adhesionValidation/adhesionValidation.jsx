import { Container } from "@mui/material";
import AdhesionValidationTable from "../../../components/tables/adhesionTable/AdhesionValidationTable";
import { LeftDrawerOrganizer } from "../../../components/leftDrawer/LeftDrawerOrganizer";

export const AdhesionValidation = () => {
  return (
    <Container>
      <div className="row mt-5 mb-3">
        <div className="col-md-2">
          <LeftDrawerOrganizer />
        </div>
        <div className="col-md-8">
          <h2>Gestion des demandes d'adhesions</h2>
        </div>
        <div className="col-md-2">
          {/* <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#createTournament"
          >
            Ajouter un Tournoi
          </button> */}
        </div>
      </div>
      <hr />
      <AdhesionValidationTable/>
    </Container>
  );
};
