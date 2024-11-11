import axios from 'axios';

export const checkDuplicate = async (id: string) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/member/duplicate` as string, {
    userid: id,
  });
  return data;
};

export const signUp = async (userData: { userid: string; username: string; password: string }) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/member/signup` as string, userData);
  return data;
};
