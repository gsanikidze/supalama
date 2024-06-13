import { Switch } from '../ui/switch'
import { useDispatch, useSelector } from 'react-redux'
import { appConfig } from '@/store'
import { Label } from '../ui/label'

export default function ThemeToggler() {
  const dispatch = useDispatch()
  const { theme } = useSelector(appConfig.select)

  return (
    <div className='flex items-center gap-2'>
      <Switch
        onClick={() => dispatch(appConfig.actions.toggleTheme())}
        checked={theme === 'dark'}
        id="theme-toggler"
      />
      <Label htmlFor='theme-toggler' className='hidden md:block text-xs'>Toggle Theme</Label>
    </div>
  )
}
