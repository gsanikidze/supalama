import ConditionalView from "@/components/ConditionalView"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import useOllama from "@/hooks/useOllama"
import { ollama } from "@/store"
import { TriangleAlert } from "lucide-react"
import { useSelector } from "react-redux"

export default function OllamaHealthCheck() {
  const { isOnSystem, isServerRunning, serverUrl } = useSelector(ollama.select)
  const { init, start, download } = useOllama()

  return (
    <div className="p-4 flex flex-col gap-4">
      <ConditionalView
        fallback={(
          <Alert>
            <AlertDescription>
              Ollama server is running on {serverUrl}
            </AlertDescription>
          </Alert>
        )}
        conditions={[!isServerRunning]}
      >
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Ollama Server Is Unreachable</AlertTitle>
          <AlertDescription>
            {`Server is not running on specified address ${serverUrl}`}
          </AlertDescription>
        </Alert>
      </ConditionalView>

      <Alert>
        {
          !isOnSystem ? <TriangleAlert className="stroke-yellow-500" /> : null
        }
        <AlertTitle>
          Local system status
        </AlertTitle>
        <AlertDescription>
          <ConditionalView
            conditions={[isOnSystem]}
            fallback={
              (
                <div>
                  <p>Ollama is not installed on your machine.</p>
                  <Button
                    onClick={download}
                    size="sm"
                    variant="outline"
                    className="mt-2"
                  >
                    Download now
                  </Button>
                </div>
              )
            }
          >
            <p>Ollama is installed on your machine</p>
            {
              !isServerRunning && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={start}
                >
                  Start Ollama
                </Button>
              )
            }
          </ConditionalView>
        </AlertDescription>
      </Alert>
      <Button
        variant="outline"
        onClick={init}
      >
        Refetch Status
      </Button>
    </div>
  )
}
