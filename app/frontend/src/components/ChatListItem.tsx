import Markdown from "react-markdown";
import rehypeHighlight from 'rehype-highlight';
import { useSelector } from "react-redux";
import { appConfig } from "@/store";
import { HTMLAttributes, useEffect } from "react";
import { Badge } from "./ui/badge";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: string;
  from: 'user' | 'bot';
}

export default function ChatListItem({ children, from, className = '', ...rest }: Props) {
  const { theme } = useSelector(appConfig.select)

  useEffect(() => {
    if (theme === 'dark') {
      import('highlight.js/styles/github-dark.css')
    } else {
      import('highlight.js/styles/github.css')
    }
  }, [theme])

  return (
    <div className={`p-2 dark:bg-slate-900 bg-slate-100 rounded-md ${className}`} {...rest}>
      <Badge className="mb-2">
        {`@${from}`}
      </Badge>
      <Markdown rehypePlugins={[rehypeHighlight]}>
        {children}
      </Markdown>
    </div>
  )
}
