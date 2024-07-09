import { useCallback, useEffect, useMemo, useState } from "react";
import { GetChats } from "wailsjs/go/main/App";
import { useToast } from "@/components/ui/use-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function useSidebar() {
  const { toast } = useToast();
  const [chats, setChats] = useState<
    { title: string; route?: string; onClick?: () => void }[]
  >([]);
  const defaultVisible = 5;
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const visibleChats = useMemo(() => {
    const c = chats.slice(0, isVisible);

    if (chats.length > defaultVisible) {
      if (isVisible === defaultVisible) {
        c.push({
          title: "Show more",
          onClick: () => setIsVisible(chats.length),
        });
      } else {
        c.push({
          title: "Show less",
          onClick: () => setIsVisible(defaultVisible),
        });
      }
    }

    return c;
  }, [isVisible, chats]);

  const fetchChats = useCallback(async () => {
    try {
      const r = await GetChats();

      setChats(() => {
        return r.map((i: any) => ({
          title: dayjs().to(dayjs(i.created_at)),
          route: `/?id=${i.id}`,
        }));
      });
    } catch (e) {
      toast({
        description: e as string,
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    dayjs.extend(relativeTime);
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const toggleVisibleChats = useCallback(() => {
    setIsVisible((st) =>
      st === defaultVisible ? chats.length : defaultVisible,
    );
  }, []);

  return {
    chats: visibleChats,
    toggleVisibleChats,
  };
}
