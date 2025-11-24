import axios from 'axios';
import { baseUrl } from '../../../const/const';
const url = `${baseUrl}/teams/`

export const getAllTeams = async() =>{
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des tournois:', error);
        throw error;
    }
}

export const getAllAvalableTeams = async() =>{
    try {
        const response = await axios.get(`${url}available/`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des Equipe libres:', error);
        throw error;
    }
}