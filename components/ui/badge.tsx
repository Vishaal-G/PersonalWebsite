import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-primary/20 bg-primary/18 text-primary hover:bg-primary/25",
				secondary:
					"border-secondary/20 bg-secondary/15 text-secondary hover:bg-secondary/25",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "border-white/10 bg-white/[0.05] text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
	VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	)
}

export { Badge, badgeVariants }
