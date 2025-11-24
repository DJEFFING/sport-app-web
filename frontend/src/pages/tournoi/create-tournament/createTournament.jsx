import { Container } from "@mui/material";
import { useState } from "react";

export const CreateTournament = () => {
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    city: "",
    start_date: "",
    end_date: "",
  });

  // État pour les erreurs de validation
  const [errors, setErrors] = useState({});

  // État pour le chargement
  const [loading, setLoading] = useState(false);

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Valider le formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom du tournoi est requis";
    }

    if (!formData.sport.trim()) {
      newErrors.sport = "Le sport est requis";
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ville est requise";
    }

    if (!formData.start_date) {
      newErrors.start_date = "La date de début est requise";
    }

    if (!formData.end_date) {
      newErrors.end_date = "La date de fin est requise";
    }

    // Vérifier que la date de fin est après la date de début
    if (formData.start_date && formData.end_date) {
      if (new Date(formData.end_date) < new Date(formData.start_date)) {
        newErrors.end_date = "La date de fin doit être après la date de début";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valider le formulaire
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // ✅ VOTRE FONCTION ICI - Appelez votre fonction de création
      await createTournament(formData);

      // Réinitialiser le formulaire après succès
      setFormData({
        name: "",
        sport: "",
        city: "",
        start_date: "",
        end_date: "",
      });

      // Fermer le modal (Bootstrap)
      const modal = document.getElementById("createTournament");
      const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }

      // Afficher un message de succès (optionnel)
      alert("Tournoi créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création du tournoi:", error);
      alert("Erreur lors de la création du tournoi : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🎯 VOTRE FONCTION DE CRÉATION
  const createTournament = async (data) => {
    // Remplacez ceci par votre propre logique
    console.log("Données du tournoi à créer:", data);

    // Exemple d'appel à votre API
    // const response = await fetch('http://127.0.0.1:8000/api/tournaments/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // return await response.json();
  };

  return (
    <div
      className="modal fade"
      id="createTournament"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header text-white bg-success">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Création d'un Tournoi
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <Container>
              <form onSubmit={handleSubmit}>
                {/* Nom du tournoi */}
                <div className="form-group mb-3">
                  <label htmlFor="tournamentName" className="form-label">
                    Nom du Tournoi <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="tournamentName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Coupe d'Automne 2025"
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                {/* Sport */}
                <div className="form-group mb-3">
                  <label htmlFor="tournamentSport" className="form-label">
                    Sport <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.sport ? "is-invalid" : ""}`}
                    id="tournamentSport"
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez un sport</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Volleyball">Volleyball</option>
                    <option value="Rugby">Rugby</option>
                    <option value="Baseball">Baseball</option>
                    <option value="Hockey">Hockey</option>
                    <option value="Autre">Autre</option>
                  </select>
                  {errors.sport && (
                    <div className="invalid-feedback">{errors.sport}</div>
                  )}
                </div>

                {/* Ville */}
                <div className="form-group mb-3">
                  <label htmlFor="tournamentCity" className="form-label">
                    Ville <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.city ? "is-invalid" : ""}`}
                    id="tournamentCity"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Ex: Montréal"
                  />
                  {errors.city && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                </div>

                {/* Date de début */}
                <div className="form-group mb-3">
                  <label htmlFor="tournamentStartDate" className="form-label">
                    Date de début <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.start_date ? "is-invalid" : ""}`}
                    id="tournamentStartDate"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.start_date && (
                    <div className="invalid-feedback">{errors.start_date}</div>
                  )}
                </div>

                {/* Date de fin */}
                <div className="form-group mb-3">
                  <label htmlFor="tournamentEndDate" className="form-label">
                    Date de fin <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.end_date ? "is-invalid" : ""}`}
                    id="tournamentEndDate"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    min={formData.start_date || new Date().toISOString().split("T")[0]}
                  />
                  {errors.end_date && (
                    <div className="invalid-feedback">{errors.end_date}</div>
                  )}
                </div>
              </form>
            </Container>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Création...
                </>
              ) : (
                "Créer le tournoi"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};