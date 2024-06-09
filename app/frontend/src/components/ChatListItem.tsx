interface Props {
  children: string;
  from: 'user' | 'bot';
}

export default function ChatListItem({ children, from }: Props) {
  return (
    <div className="border-t py-2">
      <div>
        {`@${from}`}
      </div>
      <div className="font-semibold">
        {children}
      </div>
    </div>
  )
}
