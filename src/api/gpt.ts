import axios from 'axios';

export const getAnswer = async (msg: string) => {
  const { data } = await axios.post('/', {
    msg,
  });
  return data;
};
