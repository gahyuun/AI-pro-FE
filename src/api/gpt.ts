import axios from 'axios';

export const getAnswer = async (question: string, userId: string) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/chat/question` as string, {
    question,
    userId,
  });
  return data;
};

export const getRole = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/role/get`);

  return data;
};

export const registerRole = async (role: string) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/role/set`, { role });
  return data.role;
};
