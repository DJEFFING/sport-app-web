import axios from 'axios';
import { baseUrl } from '../../../const/const.jsx';
import type { Profile } from '../../models/profile.js';

export class ProfileService{
    url= `${baseUrl}/playerprofiles/`
    
    async create(profile:Profile){
        try {
            const response = await axios.post(this.url, profile);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la création d'un profil", error);
            throw error;
        }
    }

    async findById(id:number){
        try {
            const response = await axios.get(this.url+`${id}/`);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récuperation d'un profil", error);
            throw error;
        }
    }

    async update(id:number, profile:Profile){
        try {
            const response = await axios.patch(this.url+`${id}/`, profile);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à d'un profil", error);
            throw error;
        }
    }

    async finById(id:number){
        try {
            const response = await axios.get(this.url+`${id}/`);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la reuperation du profil à d'un profil", error);
            throw error;
        }
    }
}