
import { Remirror, useRemirror, ThemeProvider } from '@remirror/react';
import { CodeBlockExtension, HardBreakExtension, MarkdownExtension } from 'remirror/extensions';
import { ReactComponent as Send } from '../assets/send.svg';
import { Button } from './ui/button';
import java from 'refractor/lang/java.js';

import '@remirror/styles/all.css';

interface ChatInputProps {
  textAreaValue: string;
  handleChange: (markdown: string) => void;
  onClickSendButton: () => void;
}

export default function ChatInput({
  textAreaValue,
  handleChange,
  onClickSendButton,
}: ChatInputProps) {

  const { manager, state } = useRemirror({
    extensions: () => [new MarkdownExtension({}), new HardBreakExtension({}), new CodeBlockExtension({
      defaultLanguage: 'java',
      supportedLanguages: [java],
      syntaxTheme: 'cb',
      defaultWrap: true,
    })],
    content: textAreaValue,
    stringHandler: 'markdown',
  });

  

  return (
    <div className={`py-5 flex w-[1200px] items-center justify-center min-h-[100px] max-h-[340px]`}>
      <ThemeProvider>
          <Remirror
          classNames={["bg-customBlack text-white overflow-y-auto"]}
            manager={manager}
            initialContent={state}
            autoRender='end'
            placeholder='질문을 입력하세요.'
            onChange={(params) => {
              const markdown = params.helpers.getMarkdown();
              handleChange(markdown); 
            }}
          />
      </ThemeProvider>
      <Button
        variant="secondary"
        size="icon"
        className="w-[90px] min-h-[80px] h-full"
        onClick={onClickSendButton}
        aria-label="send"
      >
        <Send />
      </Button>
    </div>
  );
}