import axios from "axios";

export const getAnswer = async (
  question: string,
  userId: string,
  role: string
) => {
  const { data } = await axios.post(process.env.REACT_APP_API_URL as string, {
    question,
    userId,
    role,
  });
  return data;
};
