import { HTMLAttributes, useMemo } from "react";

import Tool from "./Tool";
import { Bot, MessageSquareCode, MessageSquareText, Paperclip } from "lucide-react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Toolbar({ className, ...rest }: Props) {
  const tools = useMemo<ITool[]>(() => [
    {
      name: 'System Prompt',
      icon: <MessageSquareCode size={16} />,
      id: 'system-prompt',
      type: 'system-prompt'
    },
    {
      name: 'User Prompt',
      icon: <MessageSquareText size={16} />,
      id: 'user-prompt',
      type: 'user-prompt'
    },
    {
      name: 'File',
      icon: <Paperclip size={16} />,
      id: 'file',
      type: 'file'
    },
  ], [])

  return (
    <div {...rest} className={`p-4 border rounded-md flex flex-col gap-2 ${className}`}>
      {
        tools.map((i) => <Tool {...i} />)
      }
    </div>
  )
}
