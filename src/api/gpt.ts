import axios from 'axios';

export const getAnswer = async (msg: string) => {
  const { data } = await axios.post(process.env.REACT_APP_API_KEY as string, {
    msg,
  });
  return data;
};
