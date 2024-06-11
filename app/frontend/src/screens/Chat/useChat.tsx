import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { GetFirstModel, SendMessage } from "wailsjs/go/main/App";
import { ollama } from "wailsjs/go/models";

export default function useChat(){
  const [selectedModel, selectModel] = useState<ollama.LocalModel>()
  const [inputVal, setInputVal] = useState('')
  const [modelOptions, setModelOptions] = useState<Partial<ollama.ModelOptions>>({})
  const [chatContext, setChatContext] = useState<number[]>([])
  const [messages, setMessages] = useState<{
    from: 'user' | 'bot';
    content: string;
    id: string;
  }[]>([])

  useEffect(() => {
    GetFirstModel().then((m) => {
      selectModel(m)
    })
  }, [])

  const onInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setInputVal(e.target.value)
  }, [])

  const onSend = useCallback(() => {
    SendMessage(
      inputVal, 
      modelOptions as ollama.ModelOptions,
      chatContext,
      selectedModel!.name,
    ).then(({ Messages, Context }) => {

      setMessages((st) => {

        const newMessages = [
          ...st,
        ]

        Messages.forEach((msg: any) => {
          newMessages.push({
            from: msg.From,
            content: msg.Text,
            id: msg.ID,
          })
        })

        return newMessages
      })

      setChatContext(Context)
    })

    setInputVal('')    
  }, [inputVal, chatContext])

  return {
    onInput,
    onSend,
    inputVal,
    setModelOptions,
    modelOptions,
    messages,
    selectModel,
    selectedModel
  };
}