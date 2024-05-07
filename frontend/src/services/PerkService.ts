import axios from 'axios';
import { IPerk } from '../types/perk'; 
import { SERVER_URL } from '../utils/constants';

const baseUrl = SERVER_URL + 'api/perks/';
const tokenHeader =  {
  Authorization: `Bearer ${localStorage.getItem("site")}` // Include the token in the request headers
}


export const fetchPerks = async (userId: string): Promise<IPerk[]> => {
  const response = await axios.get(baseUrl, {params: { userId }, headers: tokenHeader});
  return response.data;
};

export const createPerk = async (newPerk: IPerk) => {
  const response = await axios.post(baseUrl, newPerk, {headers: tokenHeader});
  return response.data;
};

export const getPerk = async (_id: string) => {
  const response = await axios.get(`${baseUrl}${_id}`, {headers: tokenHeader});
  return response.data;
};

export const updatePerk = async ({_id, updatedPerk}: {_id: string, updatedPerk: IPerk}) => {
  const response = await axios.put(`${baseUrl}${_id}`, updatedPerk, {headers: tokenHeader});
  return response.data;
};

export const deletePerk = async (_id: string) => {
  const response = await axios.delete(`${baseUrl}${_id}`, {headers: tokenHeader});
  return response.data;
};
