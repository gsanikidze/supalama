import { DndContext, DragEndEvent, closestCorners, useDroppable } from "@dnd-kit/core";
import classNames from "classnames";
import { HTMLAttributes, useCallback } from "react";
import ToolConfig from "./ToolConfig";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface Props extends HTMLAttributes<HTMLDivElement> {
  tools: ITool[]
  onSort: (sortedTools: ITool[]) => void
  onDelete: (tool: ITool) => void
}

export default function Flow({ className = '', tools, onSort, onDelete, ...rest }: Props) {
  const { isOver, setNodeRef } = useDroppable({ id: 'flow' })

  const getToolPosition = useCallback((toolId: string) => tools.findIndex((i) => i.id === toolId), [tools])

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    const { active, over } = e

    if (active.id === over?.id) {
      return
    }

    const sorted = arrayMove(
      tools, 
      getToolPosition(active.id as string), 
      getToolPosition(over?.id as string),
    )

    onSort(sorted)
  }, [tools, onSort])

  return (
    <div
      {...rest}
      ref={setNodeRef}
      className={classNames(
        'p-4 border rounded-md h-full flex flex-col gap-2',
        className,
        {
          'border-green-500': isOver
        }
      )}
    >
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <SortableContext
          items={tools}
          strategy={verticalListSortingStrategy}
        >
          {tools.map((i) => <ToolConfig onDelete={onDelete} key={i.id} tool={i} />)}
        </SortableContext>
      </DndContext>
    </div>
  )
}
