import { useDraggable } from "@dnd-kit/core"
import {CSS} from '@dnd-kit/utilities';

export default function Tool(t: ITool) {
  const { id, name, icon } = t
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: t,
  })
  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      className="flex gap-2 items-center p-2 border rounded-md"
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {icon}
      <h3 className="text-sm">{name}</h3>
    </div>
  )
}
