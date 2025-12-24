import { Loader2Icon, LoaderIcon, LoaderPinwheel } from "lucide-react"

import { cn } from "@/lib/utils"

export function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}


// export function SpinnerCustom({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div className={cn("flex items-center gap-4", className)} {...props}>
//       <Spinner />
//     </div>
//   )
// }
