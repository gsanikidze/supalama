import ChatListItem from "@/components/ChatListItem";
import ModelOptions from "@/components/ModelOptions";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import useChat from "./useChat";

export default function Chat() {
  const {
    onInput,
    inputVal,
    onSend,
    modelOptions,
    setModelOptions,
    messages,
  } = useChat()

  return (
    <div className="p-4 relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="absolute top-4 right-4" variant="outline">Chat options</Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4">
          <ModelOptions
            onChange={setModelOptions}
            initialValues={modelOptions}
          />
        </PopoverContent>
      </Popover>
      <div>
        {
          messages.map((i) => (
            <ChatListItem key={i.id} from={i.from}>
              {i.content}
            </ChatListItem>
          ))
        }
      </div>
      <Textarea
        placeholder="Type your message here."
        onInput={onInput}
        value={inputVal}
      />
      <Button onClick={onSend}>Send</Button>
    </div>
  )
}
