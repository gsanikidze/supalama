import { Folder, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Button } from './ui/button'
import { OpenDirectoryDialog } from 'wailsjs/go/main/App'
import { useToast } from './ui/use-toast'

interface Props {
  onChange: (paths: string[]) => void
}

export default function FileInput({ onChange }: Props) {
  const [label, setLabel] = useState('')
  const { toast } = useToast()

  const openDialog = useCallback(async () => {
    try {
      const files = await OpenDirectoryDialog()

      setLabel(files.join(', '))
      onChange(files)
    } catch (err) {
      toast({
        description: err as string,
        variant: 'destructive'
      })
    }
  }, [toast, onChange])

  const handleClear = useCallback(() => {
    setLabel('')
    onChange([])
  }, [onChange])

  return (
    <div className='flex gap-2 items-center'>
      <div
        onClick={openDialog}
        className="hover:bg-accent cursor-pointer gap-2 flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Folder />
        <span>
          {label || 'Select Context File/Directory'}
        </span>
      </div>
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
