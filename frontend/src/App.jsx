import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container } from '@mui/material'

import ContainApp from './pages/containerApp'
import Accueil from './pages/acceuil/accueil';
import { Organisateur } from './pages/organizer/organisateur';
import AppBarLayout from './layouts/appbarLayout';
import { Joueur } from './pages/joueurs/joueur';
import { Tournament } from './pages/tournoi/tournament';
import { Team } from './pages/team/team';
import { Game } from './pages/games/games';
import { AdhesionValidation } from './pages/adhesion/adhesionValidation/adhesionValidation';
import OrganizerDashboard from './pages/organizer/organizerDashboard/organizerDashboard';
import { AvalibleTeam } from './pages/team/avilble-team/avalibleTeam';
import { getTournamentList } from './services/tournament/tounamentService';
import PlayerProfile from './pages/playerProfile/playerProfile'

function App() {
  // const [count, setCount] = useState(0)

  // List des Tounois
  return (
    <BrowserRouter>
     <AppBarLayout/>
     <Routes>
     <Route path='/' element={<Accueil/>}/>
     <Route path='/organisateur' element={<Organisateur/>}/>
     <Route path='/tournaments' element={<Tournament getTournamentList={getTournamentList()}/>}/>
     <Route path='/teams' element={<Team/>}/>
     <Route path='/avalibleTeams' element={<AvalibleTeam/>}/>
     <Route path='/games' element={<Game/>}/>
     <Route path='/adhesionValidation' element={<AdhesionValidation/>}/>
     <Route path='/organizerDashboard' element={<OrganizerDashboard/>}/>
     <Route path='/joueur' element={<Joueur/>}/>
     <Route path='/playerProfile' element={<PlayerProfile/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
