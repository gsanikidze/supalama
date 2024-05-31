import { Slider } from "@/components/ui/slider";
import { useCallback, useMemo, useState } from "react";

export default function ModelOptions() {
  const [values, setValues] = useState<Record<string, number>>({})

  const onValueChange = useCallback((parameter: string) => ([newValue]: [number]) => {
    setValues((prev) => ({
      ...prev,
      [parameter]: newValue,
    }))
  }, [])

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
      onValueChange(opt.parameter)([opt.default])
    })

    return opts
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {
        options.map((opt) => (
          <div key={opt.parameter}>
            <div className="flex gap-2 mb-2 text-sm">
              <kbd>
                {opt.parameter}: 
              </kbd>
              <span>
                {values[opt.parameter]}
              </span>
            </div>
            <Slider
              onValueChange={onValueChange(opt.parameter)}
              min={opt.min}
              max={opt.max}
              defaultValue={[opt.default]}
              step={opt.step}
            />
          </div>
        ))
      }
    </div>
  )
}
