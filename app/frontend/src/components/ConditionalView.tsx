import { ReactElement, ReactNode, memo, useMemo } from "react"
import { Skeleton } from "./ui/skeleton";

interface Props {
  children: ReactNode;
  conditions: boolean[];
  fallback?: ReactNode;
  isLoading?: boolean;
  loader?: ReactNode;
}

const ConditionalView: React.FC<Props> = ({ children, conditions, fallback, isLoading, loader }) => {
  const shouldRender = useMemo(() => conditions.every((condition) => condition), [conditions])

  if (isLoading) {
    return loader || (
      (
        <div className="p-4 flex flex-col gap-4 h-full">
          <Skeleton className="h-full w-full rounded-xl" />
        </div>
      )
    )
  }

  if (shouldRender) {
    return children
  }

  return fallback as any
}

export default memo(ConditionalView)
