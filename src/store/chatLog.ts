import { atom } from "jotai";

interface ChatEntry {
  userMessage: string;
  aiResponse: string | null;
}

export const chatLogAtom = atom<ChatEntry[]>([]);
