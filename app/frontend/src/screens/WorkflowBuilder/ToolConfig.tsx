import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import classNames from "classnames";
import { MoveVertical, X } from "lucide-react";
import { useMemo } from "react";
import SystemPrompt from "./ToolConfigs/SystemPrompt";
import UserPrompt from "./ToolConfigs/UserPrompt";
import FilePrompt from "./ToolConfigs/FilePrompt";

interface Props {
  tool: ITool
  onDelete: (tool: ITool) => void
}

export default function ToolConfig({ tool, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tool.id });

  const content = useMemo(() => {
    switch (tool.type) {
      case "system-prompt":
        return <SystemPrompt />;
      case "user-prompt":
        return <UserPrompt />;
      case "file":
        return <FilePrompt />;
      default:
        return null;
    }
  }, [tool])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={classNames(
        'border rounded-md bg-background',
        {
          "border border-green-500 z-10": isDragging,
        }
      )}
      style={style}
      ref={setNodeRef}
    >
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex gap-2 items-center">
          {tool.icon}
          <h3 className="text-sm">{tool.name}</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            {...listeners}
            {...attributes}
          >
            <MoveVertical size={16} />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(tool)}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
      <div className="p-2">
        { content }
      </div>
    </div>
  )
}
