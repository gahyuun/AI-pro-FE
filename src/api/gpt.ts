import axios from "axios";

export const getAnswer = async (question: string, userId: string) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/chat/question` as string,
    {
      question,
      userId,
    }
  );
  return data;
};
