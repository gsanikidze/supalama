import { useToast } from "@/components/ui/use-toast";
import { ollama } from "@/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { IsOllamaInstalled, IsOllamaRunning, StartOllama, GetOllamaServerUrl } from "wailsjs/go/main/App";
import { BrowserOpenURL } from "wailsjs/runtime/runtime"

export default function useOllama(){
  const dispatch = useDispatch()
  const { toast } = useToast()

  const init = useCallback(async () => {
    const [
      isRunning,
      isOnSystem,
      serverUrl,
    ] = await Promise.all([
      IsOllamaRunning(),
      IsOllamaInstalled(),
      GetOllamaServerUrl(),
    ])

    dispatch(ollama.actions.init({
      isRunning,
      isOnSystem,
      serverUrl,
    }))
  }, [dispatch])

  const start = useCallback(async () => {
    try {
      await StartOllama()

      toast({
        title: 'Ollama started',
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Failed to start ollama',
        description: err as string,
      })
    }
  }, [toast])

  const download = useCallback(() => {
    BrowserOpenURL('https://ollama.com/download')
  }, [])

  const subscribeOnStatus = useCallback(() => {
    let prevToast: {
      dismiss: () => void
    } | undefined

    const interval = setInterval(async () => {
      const isRunning = await IsOllamaRunning()

      if (!isRunning) {
        if (!prevToast) {
          prevToast = toast({
            variant: 'destructive',
            title: 'Ollama is not running',
          })

          init()
        }
      } else if (prevToast) {
        prevToast = undefined
        init()
      }
    }, 5_000)

    return () => {
      clearInterval(interval)
    }
  }, [init, toast])

  return {
    init,
    start,
    download,
    subscribeOnStatus,
  };
}