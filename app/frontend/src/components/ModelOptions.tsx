import { Slider } from "@/components/ui/slider";
import { useCallback, useMemo, useState } from "react";
import { ollama } from "wailsjs/go/models";

type ParameterValues = Partial<ollama.ModelOptions>

interface Props {
  onChange?: (val: ParameterValues) => void
  initialValues?: ParameterValues
}

export default function ModelOptions({ onChange, initialValues = {} }: Props) {
  const [values, setValues] = useState<ParameterValues>(initialValues)

  const onValueChange = useCallback((parameter: string) => ([newValue]: [number]) => {
    setValues((prev) => {
      const newSt = {
        ...prev,
        [parameter]: newValue,
      }

      onChange?.(newSt)

      return newSt
    })
  }, [onChange])

  const options = useMemo(() => {
    const opts = [
      {
        parameter: 'mirostat',
        default: 0,
        min: 0,
        max: 2,
        step: 1,
      },
      {
        parameter: 'mirostat_eta',
        default: 0.1,
        min: 0,
        max: 1,
        step: 0.05,
      },
      {
        parameter: 'mirostat_tau',
        default: 5,
        min: 0,
        max: 10,
        step: 0.05,
      },
      {
        parameter: 'num_ctx',
        default: 2048,
        min: 0,
        max: 100_000,
        step: 8,
      },
      {
        parameter: 'repeat_last_n',
        default: 64,
        min: -1,
        max: 100,
        step: 1,
      },
      {
        parameter: 'repeat_penalty',
        default: 1.1,
        min: 0,
        max: 10,
        step: 0.1,
      },
      {
        parameter: 'temperature',
        default: 0.8,
        min: 0,
        max: 1,
        step: 0.05,
      },
      {
        parameter: 'seed',
        default: 0,
        min: 0,
        max: 100,
        step: 1,
      },
      {
        parameter: 'tfs_z',
        default: 1,
        min: 0,
        max: 10,
        step: 0.1,
      },
      {
        parameter: 'num_predict',
        default: 128,
        min: -2,
        max: 500,
        step: 1,
      },
      {
        parameter: 'top_k',
        default: 40,
        min: 0,
        max: 100,
        step: 1,
      },
      {
        parameter: 'top_p',
        default: 0.9,
        min: 0,
        max: 1,
        step: 0.05,
      },
    ]

    opts.forEach((opt) => {
      setValues((st) => {
        if (st[opt.parameter as keyof ollama.ModelOptions] === undefined) {
          return {
            ...st,
            [opt.parameter]: opt.default,
          }
        }

        return st
      })
    })

    return opts
  }, [])

  return (
    <div className="grid grid-cols-2 gap-6">
      {
        options.map((opt) => (
          <div key={opt.parameter}>
            <div className="flex gap-2 mb-2 text-sm">
              <kbd>
                {opt.parameter}: 
              </kbd>
              <span>
                {values[opt.parameter as keyof ollama.ModelOptions]}
              </span>
            </div>
            <Slider
              onValueChange={onValueChange(opt.parameter)}
              min={opt.min}
              max={opt.max}
              defaultValue={[values[opt.parameter as keyof ollama.ModelOptions] as number]}
              step={opt.step}
            />
          </div>
        ))
      }
    </div>
  )
}
