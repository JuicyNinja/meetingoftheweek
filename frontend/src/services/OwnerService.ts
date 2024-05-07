import { IPaginatedOwners, IOwner } from '../types/owner'; 
import { SERVER_URL } from '../utils/constants';
import instance from '../utils/axiosInstance';

const baseUrl = SERVER_URL + 'api/owners/';

export const fetchOwners = async (page: number, limit: number = 10): Promise<IPaginatedOwners> => {
  const response = await instance.get(baseUrl, {params: { page, limit }});
  return response.data;
};

export const createOwner = async (newOwner: IOwner) => {
  const response = await instance.post(baseUrl, newOwner);
  return response.data;
};

export const getOwner = async (_id: string) => {
  const response = await instance.get(`${baseUrl}${_id}`);
  return response.data;
};

export const updateOwner = async ({_id, updatedOwner}: {_id: string, updatedOwner: IOwner}) => {
  const response = await instance.put(`${baseUrl}${_id}`, updatedOwner);
  return response.data;
};

export const deleteOwner = async (_id: string) => {
  const response = await instance.delete(`${baseUrl}${_id}`);
  return response.data;
};


export const fetchOwnerTotals = async () => {
  const url = baseUrl + "total/";
  const response = await instance.get(url);
  return response.data;
};