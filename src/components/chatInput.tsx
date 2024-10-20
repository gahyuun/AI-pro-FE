
import { Remirror, useRemirror, ThemeProvider } from '@remirror/react';
import { CodeBlockExtension, HardBreakExtension, MarkdownExtension } from 'remirror/extensions';
import { ReactComponent as Send } from '../assets/send.svg';
import { Button } from './ui/button';

import '@remirror/styles/all.css';

interface ChatInputProps {
  textAreaValue: string;
  handleChange: (markdown: string) => void;
  onClickSendButton: () => void;
  size: 'big' | 'small';
}

export default function ChatInput({
  textAreaValue,
  handleChange,
  onClickSendButton,
  size,
}: ChatInputProps) {
  const width = size === 'big' ? 'w-[1200px]' : 'w-[888px]';

  const { manager, state } = useRemirror({
    extensions: () => [new MarkdownExtension({}), new HardBreakExtension({}), new CodeBlockExtension({
      defaultLanguage: 'java',
      syntaxTheme: 'base16_ateliersulphurpool_light',
      defaultWrap: true,
    })],
    content: textAreaValue,
    stringHandler: 'markdown',
  });

  return (
    <div className={`py-5 flex w-full ${width} items-center`}>
      <ThemeProvider>
          <Remirror
          classNames={["bg-customBlack text-white max-h-[400px] w-[1006px] overflow-y-auto"]}
            manager={manager}
            initialContent={state}
            autoRender='end'
            onChange={(params) => {
              const markdown = params.helpers.getMarkdown();
              handleChange(markdown); 
            }}
          />
      </ThemeProvider>
      <Button
        variant="secondary"
        size="icon"
        className="w-[90px] min-h-[80px]"
        onClick={onClickSendButton}
      >
        <Send />
      </Button>
    </div>
  );
}