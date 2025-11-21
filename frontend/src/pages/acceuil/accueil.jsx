import React from "react";
import { Container, Typography, Button, Box, Paper, Grid, List, ListItem, ListItemText, Divider } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const Accueil = () => (
  <Container maxWidth="md" sx={{ py: 5 }}>
    <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: "center" }}>
      <Typography variant="h3" component="h2" gutterBottom>
        <SportsSoccerIcon fontSize="large" sx={{ mr: 1, color: "primary.main" }} />
        La page d'accueil
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Bienvenue sur notre application sportive !
      </Typography>
    </Paper>

    <Grid container spacing={10}>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
          <Typography variant="h5" gutterBottom>
            <GroupAddIcon sx={{ mr: 1, color: "secondary.main" }} />
            Rejoignez une équipe et participez à des matchs !
          </Typography>
          <Typography variant="body1" gutterBottom>
            Inscrivez-vous dès maintenant pour rejoindre une équipe et vivre votre passion pour le football.
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            S'inscrire
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
          <Typography variant="h5" gutterBottom>
            <EmojiEventsIcon sx={{ mr: 1, color: "warning.main" }} />
            Devenez organisateur
          </Typography>
          <Typography variant="body1" gutterBottom>
            Créez des compétitions, formez des équipes et organisez des matchs pour rassembler les passionnés de football.
          </Typography>
          <Button variant="outlined" color="secondary" fullWidth>
            Devenir organisateur
          </Button>
        </Paper>
      </Grid>
    </Grid>

    <Box mt={5}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Quelques chiffres
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary={<strong>500+</strong>} secondary="équipes inscrites" />
          </ListItem>
          <ListItem>
            <ListItemText primary={<strong>1200+</strong>} secondary="joueurs actifs" />
          </ListItem>
          <ListItem>
            <ListItemText primary={<strong>50+</strong>} secondary="compétitions organisées" />
          </ListItem>
        </List>
      </Paper>
    </Box>

    <Box mt={5}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Témoignages
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ fontStyle: "italic" }}>
          "Une plateforme incroyable pour rencontrer d'autres passionnés de football et jouer des matchs compétitifs."
        </Typography>
        <Typography variant="caption" display="block" align="right" sx={{ mb: 2 }}>
          - Alex, joueur
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: "italic" }}>
          "Organiser des compétitions n'a jamais été aussi simple. Merci pour cette application !"
        </Typography>
        <Typography variant="caption" display="block" align="right">
          - Sarah, organisatrice
        </Typography>
      </Paper>
    </Box>

    <Box mt={5} mb={3}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Comment ça marche ?
        </Typography>
        <ol>
          <li>
            <Typography variant="body1">Créez un compte.</Typography>
          </li>
          <li>
            <Typography variant="body1">Rejoignez une équipe ou devenez organisateur.</Typography>
          </li>
          <li>
            <Typography variant="body1">Participez à des matchs ou organisez des compétitions.</Typography>
          </li>
        </ol>
      </Paper>
    </Box>
  </Container>
);

export default Accueil;