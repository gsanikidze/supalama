import { Folder, X } from 'lucide-react'
import { Label } from './ui/label'
import { ChangeEventHandler, useState } from 'react'
import { Button } from './ui/button'

interface Props {
  onChange: (files: File[]) => void
}

export default function FileInput({ onChange }: Props) {
  const [label, setLabel] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const labels: string[] = []
      const files: File[] = []

      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        labels.push(file.name)
        files.push(file)
      }

      setLabel(labels.join(', '))
      onChange(files)
    } else {
      setLabel('')
    }
  }

  const handleClear = () => {
    setLabel('')
    onChange([])
  }

  return (
    <div className='flex gap-2 items-center'>
      <input
        type="file"
        multiple
        className="hidden"
        id="chat-context"
        onChange={handleChange}
      />
      <Label htmlFor="chat-context">
        <div className="hover:bg-accent cursor-pointer gap-2 flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <Folder />
          <span>
            {label || 'Select Context File/Directory'}
          </span>
        </div>
      </Label>
      {
        label && (
          <Button size="icon" onClick={handleClear} variant="outline">
            <X />
          </Button>
        )
      }
    </div>
  )
}
