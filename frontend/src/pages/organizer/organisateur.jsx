import { Container } from "@mui/material";
import BasicTable from "../../components/tables/teamTable";
import { LeftDrawerOrganizer } from "../../components/leftDrawer/LeftDrawerOrganizer";
import { CreateTeam } from "../team/create-team/createTeam";
import { Team } from "../team/team";
import { Tournament } from "../tournoi/tournament";

export const Organisateur = () => {
  return (
    <Container>
      {/* <Team/> */}
      <Tournament/>
    </Container>
  );
};
