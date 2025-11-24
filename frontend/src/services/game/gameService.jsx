import axios from 'axios';
import { baseUrl } from '../../../const/const';
const url = `${baseUrl}/matches/`

export const getAllgames = async() =>{
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des Matchs:', error);
        throw error;
    }
}
