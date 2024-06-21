import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import Toolbar from "./Toolbar";
import Flow from "./Flow";
import { useCallback, useState } from "react";

export default function WorkflowBuilder() {
  const [addedTools, setAddedTools] = useState<ITool[]>([])

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    if (e.over?.id === 'flow') {
      setAddedTools(st => [...st, e.active.data.current as ITool])
    }
  }, [])

  const handleDelete = useCallback((tool: ITool) => {
    setAddedTools(st => st.filter(t => t.id !== tool.id))
  }, [])

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="p-4 grid grid-cols-12 gap-4 h-full">
        <Flow
          className="col-span-8"
          tools={addedTools}
          onSort={setAddedTools}
          onDelete={handleDelete}
        />
        <Toolbar className="col-span-4" />
      </div>
    </DndContext>
  )
}