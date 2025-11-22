import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from "@mui/material";
import { LeftDrawerOrganizer } from "../../../components/leftDrawer/LeftDrawerOrganizer";
// import { LeftDrawerOrganizer } from "../../../components/LeftDrawerOrganizer/LeftDrawerOrganizer";

const stats = [
  { label: "Tournois créés", value: 5 },
  { label: "Total équipes", value: 18 },
  { label: "Demandes en attente", value: 3 },
];

const tournaments = [
  { name: "Tournoi Printemps", date: "2024-05-10" },
  { name: "Coupe Été", date: "2024-06-15" },
  { name: "Challenge Automne", date: "2024-09-01" },
];

export default function OrganizerDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <div className="row">
        <div className="col-md-2">
          <LeftDrawerOrganizer />
        </div>
        <div className="col-md-8">
          <Typography variant="h4" gutterBottom>
            Tableau de bord organisateur
          </Typography>
        </div>
        <div className="col-md-2">
          <LeftDrawerOrganizer />
        </div>
      </div>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} md={4} key={stat.label}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                {stat.label}
              </Typography>
              <Typography variant="h4" color="primary">
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <hr />
      <Typography variant="h5" gutterBottom>
        Liste des tournois
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tournaments.map((t, idx) => (
              <TableRow key={idx}>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.date}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    Voir
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="warning"
                    sx={{ mr: 1 }}
                  >
                    Éditer
                  </Button>
                  <Button size="small" variant="outlined" color="error">
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
