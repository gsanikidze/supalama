import { useToast } from "@/components/ui/use-toast";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GetChatMessages, GetFirstModel, SendMessage } from "wailsjs/go/main/App";
import { ollama } from "wailsjs/go/models";
import { EventsOff, EventsOn } from "wailsjs/runtime"

export default function useChat() {
  const [selectedModel, selectModel] = useState<ollama.LocalModel>()
  const [inputVal, setInputVal] = useState('')
  const [modelOptions, setModelOptions] = useState<Partial<ollama.ModelOptions>>({})
  const [messages, setMessages] = useState<{
    From: 'user' | 'bot';
    Text: string;
    ID: string;
  }[]>([])
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const chatId = useMemo(() => Number(searchParams.get('id')) || 0, [searchParams])
  const chatListRef = useRef<HTMLDivElement>(null)

  const scrollDown = useCallback(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [chatListRef])

  const fetchMessages = useCallback(async (id: number) => {
    if (id) {
      try {
        const res = await GetChatMessages(id)

        setMessages(res.map((i: any) => ({
          From: i.author,
          Text: i.text,
          ID: i.id
        })))
      } catch (e) {
        toast({
          description: e as any,
          variant: "destructive"
        })
      }
    } else {
      setMessages([])
    }
  }, [toast])

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
      chatId,
      inputVal,
      modelOptions as ollama.ModelOptions,
      selectedModel!.name,
    )

    setInputVal('')
  }, [inputVal, chatId])

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
    EventsOn("NEW_CHAT", (data: number) => {
      setSearchParams({ id: data.toString() })
    })

    return () => {
      EventsOff("NEW_CHAT")
    }
  }, [setSearchParams])

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

  useEffect(() => {
    EventsOn("MESSAGE_ERROR", (data: string) => {
      toast({
        description: data,
        variant: "destructive"
      })
    })

    return () => {
      EventsOff("MESSAGE_ERROR")
    }
  }, [])

  useEffect(() => {
    setMessages([])
  }, [chatId])

  useEffect(() => {
    fetchMessages(chatId)
  }, [fetchMessages, chatId])

  useEffect(scrollDown, [scrollDown, messages])

  return {
    onInput,
    inputVal,
    setModelOptions,
    modelOptions,
    messages,
    selectModel,
    selectedModel,
    onEnter,
    chatListRef,
  };
}