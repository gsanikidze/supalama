import { useCallback, useEffect, useState } from "react";
import { GetChats } from "wailsjs/go/main/App";
import { useToast } from "@/components/ui/use-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function useSidebar() {
  const { toast } = useToast()
  const [chats, setChats] = useState<{ title: string; route: string }[]>([])

  const fetchChats = useCallback(async () => {
    try {
      const r = await GetChats(1, 5)

      setChats(() => {
        return r.data.map((i: any) => ({
          title: dayjs().to(dayjs(i.created_at)),
          route: `/?id=${i.id}`
        }))
      })
    } catch (e) {
      toast({
        description: e as string,
        variant: "destructive"
      })
    }
  }, [toast])

  useEffect(() => {
    dayjs.extend(relativeTime)
  }, [])

  useEffect(() => {
    fetchChats()
  }, [fetchChats])

  return {
    chats,
  };
}