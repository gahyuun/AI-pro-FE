import axios from "axios";

export const getAnswer = async (
  question: string,
  userId: string,
  role: string
) => {
  const { data } = await axios.post(
    " http://15.165.114.217:8080/api/chat/question" as string,
    {
      question,
      userId,
      role,
    }
  );
  return data;
};
