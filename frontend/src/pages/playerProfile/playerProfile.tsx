import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { LeftDrawerPlayer } from "../../components/leftDrawer/LeftDrawerPlayer.jsx";
import type { Profile } from "../../models/profile.js";
import { useEffect, useMemo, useState } from "react";
import { ProfileService } from "../../services/profile/profileService.js";

const initProfile: Profile = {
  user_id: "",
  full_name: "",
  city: "",
  favorite_sport: "",
  level: "",
  position: "",
};

// l'id par defaut du Joueur
const defautPlayerId: number = 1;

// profileService:ProfileService = new ProfileService();

function PlayerProfile() {
  const profileService = useMemo(() => new ProfileService(), []); // <-- Initialisation correcte dans un composant fonctionnel
  const [formData, setFormData] = useState<Profile>(initProfile);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    //Gestion de la reuperation d'un profil
    const getProfil = async () =>{
      setLoading(true);
      const result = await profileService.findById(defautPlayerId);
      console.log("Le profile du jouer 1 , ", result)
      setFormData(result);
      setLoading(false);
    };

    getProfil();
  },[profileService])


  // Fonction de gestion des changements dans les champs de texte
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("Soumission des données de mise à jour:", formData);

    // Simuler un appel API PATCH
    try {
      // Ici, vous feriez l'appel à votre API Django pour PATCH /api/profiles/{user_id}/
      // await new Promise((resolve) => setTimeout(resolve, 1500)); // Délai de 1.5s

      const result = await profileService.update(defautPlayerId, formData);
      console.log("Resulat de la mise à jour:", result);
      console.log("Profil mis à jour avec succès !");
      setFormData(result);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="row mt-5 mb-3">
        <div className="col-md-2">
          <LeftDrawerPlayer />
        </div>
        <div className="col-md-8">
          <h2>Profile Utilisateur</h2>
        </div>
      </div>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 3, color: "#1976d2" }}
          >
            Mise à Jour du Profil Joueur
          </Typography>

          {/* Nom Complet */}
          <TextField
            margin="normal"
            fullWidth
            required
            id="full_name"
            label="Nom Complet"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />

          {/* Ville */}
          <TextField
            margin="normal"
            fullWidth
            required
            id="city"
            label="Ville"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          {/* Sport Favori */}
          <TextField
            margin="normal"
            fullWidth
            required
            id="favorite_sport"
            label="Sport Favori"
            name="favorite_sport"
            value={formData.favorite_sport}
            onChange={handleChange}
          />

          {/* Niveau */}
          <TextField
            margin="normal"
            fullWidth
            required
            id="level"
            label="Niveau"
            name="level"
            value={formData.level}
            onChange={handleChange}
          />

          {/* Position */}
          <TextField
            margin="normal"
            fullWidth
            id="position"
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            helperText="Ex: Gardien, Défenseur, Ailier..."
          />

          {/* Le champ user_id est laissé non modifiable */}
          <TextField
            margin="normal"
            fullWidth
            id="user_id"
            label="ID Utilisateur (Lecture Seule)"
            name="user_id"
            value={formData.user_id}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mt: 2 }}
          />

          {/* Bouton de Soumission */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 4, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Sauvegarde..." : "Sauvegarder les Changements"}
          </Button>
        </Box>
      </Container>
    </Container>
  );
}

export default PlayerProfile;
