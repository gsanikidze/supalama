import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { GetFirstModel, SendMessage } from "wailsjs/go/main/App";
import { ollama } from "wailsjs/go/models";
import { EventsOff, EventsOn } from "wailsjs/runtime"

export default function useChat(){
  const [selectedModel, selectModel] = useState<ollama.LocalModel>()
  const [inputVal, setInputVal] = useState('')
  const [modelOptions, setModelOptions] = useState<Partial<ollama.ModelOptions>>({})
  const [chatContext, setChatContext] = useState<number[]>([])
  const [messages, setMessages] = useState<{
    From: 'user' | 'bot';
    Text: string;
    ID: string;
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
    )

    setInputVal('')    
  }, [inputVal, chatContext])

  const onEnter: React.KeyboardEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault()
      onSend()
    }
  }, [onSend])

  useEffect(() => {
    EventsOn("NEW_MESSAGE", (data) => {
      setMessages((st) => [...st, data])
    })

    return () => {
      EventsOff("NEW_MESSAGE")
    }
  }, [])

  useEffect(() => {
    EventsOn("NEW_CONTEXT", setChatContext)

    return () => {
      EventsOff("NEW_CONTEXT")
    }
  }, [])

  useEffect(() => {
    EventsOn("MESSAGE_UPDATE", (data) => {
      setMessages((st) => st.map((m) => {
        if (m.ID === data.ID) {
          return data
        }

        return m
      }))
    })

    return () => {
      EventsOff("MESSAGE_UPDATE")
    }
  }, [])

  return {
    onInput,
    inputVal,
    setModelOptions,
    modelOptions,
    messages,
    selectModel,
    selectedModel,
    onEnter
  };
}