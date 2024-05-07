;
import { toast } from 'react-toastify';
import { IPaginatedUsers, IUser } from '../types/user'; 
import instance from '../utils/axiosInstance';
import { SERVER_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const baseUrl = SERVER_URL + 'api/users/';
const tokenHeader =  {
  Authorization: `Bearer ${localStorage.getItem("site")}` // Include the token in the request headers
}

export const fetchUsers = async (page: number, limit: number = 10): Promise<IPaginatedUsers> => {
  const response = await instance.get(baseUrl, {params: { page, limit }});
  return response.data;
};

export const createUser = async (newUser: IUser) => {
  const response = await instance.post(baseUrl, newUser);
  return response.data;
};

export const register = async (newUser: IUser) => {
  try{
    const response = await instance.post(SERVER_URL + "account/signup", newUser);
    const navigate = useNavigate();
    toast.success('Register success.', {
      hideProgressBar: true,
      autoClose: 5000,
      type: "success",
      position: "top-right",
    });
    navigate("/signin");
    return response.data;
  }catch(err){
    console.log("err",err);
    toast.error('Error', {
      hideProgressBar: true,
      autoClose: 5000,
      type: "error",
      position: "top-right",
  });
  }
};

export const resetPassword = async (data:{currentpassword: string, password: string, confirmpassword: string}) => {
  try{
    const response = await instance.post(SERVER_URL + "account/password-reset", data);
    return response.data;
  } catch(err){
    console.log("err",err);
  }
};
export const signin = async (User: {email:string,password:string}) => {
  try{
  const response = await instance.post(SERVER_URL + "account/login", User);
  return response.data;
  }catch(err){
    console.log("err",err);
  }
};
export const fetchMe = async () => {
  try{
  const response = await instance.get(SERVER_URL + "account/me", {headers: tokenHeader});
  return response.data;
  }catch(err){
    console.log("err",err);
  }
};

export const getUser = async (_id: string) => {
  const response = await instance.get(`${baseUrl}${_id}`, {headers: tokenHeader});
  return response.data;
};

export const updateUser = async ({_id, updatedUser}: {_id: string, updatedUser: IUser}) => {
  const response = await instance.put(`${baseUrl}${_id}`, updatedUser, {headers: tokenHeader});
  return response.data;
};

export const deleteUser = async (_id: string) => {
  const response = await instance.delete(`${baseUrl}${_id}`, {headers: tokenHeader});
  return response.data;
};
export const resetPasswordUser = async (_id: string) => {
  const response = await instance.put(`${baseUrl}${_id}` + '/reset', {headers: tokenHeader});
  return response.data;
};

export const fetchUserTotals = async () => {
  const url = baseUrl + "total/";
  const response = await instance.get(url);
  return response.data;
};

export const fetchRecentMemberTotals = async () => {
  const url = baseUrl + "recent/count";
  const response = await instance.get(url);
  return response.data;
};