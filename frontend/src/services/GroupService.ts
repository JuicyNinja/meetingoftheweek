
import { IPaginatedGroups, IGroup, IMember } from '../types/group'; 
import instance from '../utils/axiosInstance';
import { SERVER_URL } from '../utils/constants';

const baseUrl = SERVER_URL + 'api/groups/';
const tokenHeader =  {
  Authorization: `Bearer ${localStorage.getItem("site")}` // Include the token in the request headers
}

export const fetchGroups = async (page: number, limit: number = 10): Promise<IPaginatedGroups> => {
  const response = await instance.get(baseUrl, {params: { page, limit }});
  return response.data;
};

export const createGroup = async (newGroup: IGroup) => {
  const response = await instance.post(baseUrl, newGroup);
  return response.data;
};

export const getGroup = async (_id: string) => {
  const response = await instance.get(`${baseUrl}${_id}`);
  return response.data;
};

export const updateGroup = async ({_id, updatedGroup}: {_id: string, updatedGroup: IGroup}) => {
  const response = await instance.put(`${baseUrl}${_id}`, updatedGroup);
  return response.data;
};

export const deleteGroup = async (_id: string) => {
  const response = await instance.delete(`${baseUrl}${_id}`);
  return response.data;
};

export const joinGroup = async (_id: string) => {
  const param = {
    userId: "",
    groupId: _id,
    headers: tokenHeader
  };
  const response = await instance.post(`${baseUrl + "join"}`, param);
  return response.data;
};

export const fetchGroupTotals = async () => {
  const url = baseUrl + "total/";
  const response = await instance.get(url);
  return response.data;
};

export const fetchRecentGroupTotals = async () => {
  const url = baseUrl + "recent/count";
  const response = await instance.get(url);
  return response.data;
};

export const fetchGroupMembers = async (_id: string, cate: string = 'ALL'): Promise<IMember[]> => {
  const response = await instance.get(`${baseUrl}${_id}` + "/members", {params: { cate }});
  return response.data;
};

export const createSeat = async (newSeat: IMember) => {
  const response = await instance.post(`${baseUrl}member`, newSeat);
  return response.data;
};

export const getSeat = async (_id: string) => {
  const response = await instance.get(`${baseUrl}member/${_id}`);
  return response.data;
};

export const updateSeat = async ({_id, updatedSeat}: {_id: string, updatedSeat: IMember}) => {
  const response = await instance.put(`${baseUrl}member/${_id}`, updatedSeat);
  return response.data;
};

export const deleteSeat = async (_id: string) => {
  const response = await instance.delete(`${baseUrl}member/${_id}`);
  return response.data;
};