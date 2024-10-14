import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ReactComponent as Send } from "../assets/send.svg";

interface ChatInputProps {
  textAreaValue: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickSendButton: () => void;
  size: "big" | "small";
}

export default function ChatInput({
  textAreaValue,
  handleChange,
  onClickSendButton,
  size,
}: ChatInputProps) {
  const width = size === "big" ? "w-[1116px]" : "w-[888px]";

  return (
    <div className={`py-5 flex w-full ${width}`}>
      <Textarea
        value={textAreaValue}
        onChange={handleChange}
        placeholder="AI PRO에게 피드백을 요청할 코드를 입력해주세요."
        className="w-[1026px] h-20"
      />
      <Button
        variant="secondary"
        size="icon"
        className="w-[90px] h-20"
        onClick={onClickSendButton}
      >
        <Send />
      </Button>
    </div>
  );
}
