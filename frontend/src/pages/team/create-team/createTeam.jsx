import { Container } from "@mui/material";

export const CreateTeam = () => {
  return (
    <div
      className="modal fade"
      id="createTeam"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header text-white bg-success">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Création d'une Equipe
            </h1>
            <button
              type="button "
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Container>
              <h4>Formualire de création d'une Equipe</h4>
            </Container>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
