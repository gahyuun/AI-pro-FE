import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const getAccessToken = () => {
  const accessToken = cookies.get('accessToken');
  return accessToken;
};

export const getAnswer = async (question: string, catalogId?: number) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/chat/question` as string,
    { question},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      params: {
        catalogId: catalogId ?? null,
      },
    }
  );
  return data;
}; 

export const getRole = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/role/get`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return data;
};

export const registerRole = async (role: string) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/role/set`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return data.role;
};

export const getChatList = async () => {
  const { data } = await axios.get<{ catalogId: number; summary: string; userId: string }[]>(
    `${process.env.REACT_APP_API_URL}/api/getChatCatalog`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return data;
};

export const getChatLog = async (catalogId?: number) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/getChatHistory`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      params: {
        catalogId: catalogId ?? null,
      },
    }
  );
  return data;
};