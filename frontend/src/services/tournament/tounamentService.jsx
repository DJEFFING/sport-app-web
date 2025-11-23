import axios from 'axios';
import { baseUrl } from '../../../const/const';


const url = `${baseUrl}/tournaments/`

export const create = () =>{

}



export const getTournamentList = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des tournois:', error);
        throw error;
    }
};