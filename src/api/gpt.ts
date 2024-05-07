import axios from "axios";

export const getAnswer = async (msg: string) => {
  const { data } = await axios.post("http://localhost:8080/" as string, {
    msg,
  });
  return data;
};
