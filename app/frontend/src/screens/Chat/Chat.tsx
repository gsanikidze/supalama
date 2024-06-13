import ChatListItem from "@/components/ChatListItem";
import ModelOptions from "@/components/ModelOptions";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import useChat from "./useChat";
import ModelSelector from "@/components/ModelSelector";
import { SlidersHorizontal } from "lucide-react";

export default function Chat() {
  const {
    onInput,
    inputVal,
    modelOptions,
    setModelOptions,
    messages,
    selectModel,
    selectedModel,
    onEnter,
  } = useChat()

  return (
    <div className="h-full">
      <div
        className="flex justify-end gap-2 p-4 sticky top-0 border-b"
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {
                selectedModel ? selectedModel.name : "Select Model"
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4">
            <ModelSelector
              onSelect={selectModel}
              defaultSelected={selectedModel}
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4">
            <ModelOptions
              onChange={setModelOptions}
              initialValues={modelOptions}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div
        className="p-4 overflow-y-auto"
        style={{
          height: 'calc(100vh - 186px)',
        }}
      >
        {
          messages.map((i) => (
            <ChatListItem
              key={i.id}
              from={i.from}
              className={`w-10/12 mb-4 ${i.from === 'user' && 'ml-auto'}`}
            >
              {i.content}
            </ChatListItem>
          ))
        }
      </div>
      <div className="p-4 border-t top-full">
        <Textarea
          placeholder="Type your message here."
          onInput={onInput}
          value={inputVal}
          onKeyDown={onEnter}
          className="resize-none"
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  )
}
