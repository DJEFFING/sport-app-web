import axios from 'axios';
import { baseUrl } from '../../../const/const.jsx';
import type { JoinRequest } from '../../models/joinRequest.js';

export class JoinRequestService{
    url= `${baseUrl}/join-requests/`
    async create(joinRequest: JoinRequest){
        console.log(joinRequest)
        try {
            const response = await axios.post(this.url, joinRequest);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la création d'une demande", error);
            throw error;
        }
    }
}