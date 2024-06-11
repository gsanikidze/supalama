import { useEffect, useState } from "react"
import { GetModels } from "wailsjs/go/main/App";
import { ollama } from "wailsjs/go/models";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CircleCheck } from "lucide-react";

interface Props {
  defaultSelected?: ollama.LocalModel;
  onSelect: (model: ollama.LocalModel) => void;
}

export default function ModelSelector({ onSelect, defaultSelected }: Props) {
  const [models, setModels] = useState<ollama.LocalModel[]>([])

  useEffect(() => {
    GetModels().then((m) => {
      setModels(m)
    })
  }, [])

  return (
    <ul>
      {models.map((m) => (
        <li key={m.name} className="flex justify-between items-center pb-2 border-b mb-2">
          <div className="flex gap-2 items-center">
            <h3>{m.name}</h3>
            <Badge variant="outline">{m.details.parameter_size}</Badge>
          </div>
          <div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => onSelect(m)}
            >
              <CircleCheck
                className={defaultSelected?.name === m.name ? "stroke-green-500" : "stroke-foreground"}
              />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
