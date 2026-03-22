import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'button-sheen relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full border text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'border-primary/20 bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-primary/95',
				destructive:
					'border-destructive/30 bg-destructive text-destructive-foreground hover:-translate-y-0.5 hover:bg-destructive/90',
				outline:
					'border-white/10 bg-white/[0.04] text-foreground backdrop-blur-xl hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.09]',
				secondary:
					'border-secondary/25 bg-secondary text-secondary-foreground hover:-translate-y-0.5 hover:bg-secondary/90',
				ghost: 'border-transparent bg-transparent hover:border-white/10 hover:bg-white/[0.06] hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-11 px-5 py-2',
				sm: 'h-9 px-4 text-xs',
				lg: 'h-12 px-8 text-base',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size }), className)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
