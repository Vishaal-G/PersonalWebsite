'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, ChevronDown } from 'lucide-react';

import { siteConfig } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<motion.header
			className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div
				className={`mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between rounded-full border px-5 transition-all duration-300 md:px-6 ${
					isScrolled
						? 'border-white/12 bg-background/78 shadow-[0_20px_55px_-32px_rgba(0,0,0,0.9)] backdrop-blur-2xl'
						: 'border-white/10 bg-background/42 backdrop-blur-xl'
				}`}
			>
				<div className="flex items-center gap-6 md:gap-10">
					<Link href="/" className="flex items-center space-x-2">
						<motion.div
							whileHover={{ scale: 1.05 }}
							className="text-2xl font-bold tracking-[-0.08em] text-gradient"
						>
							Portfolio
						</motion.div>
					</Link>
					<nav className="hidden md:flex gap-6">
						{siteConfig.mainNav.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`nav-link text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? 'text-primary active' : 'text-muted-foreground'
									}`}
							>
								{item.title}
							</Link>
						))}
					</nav>
				</div>

				{/* Mobile menu */}
				<div className="md:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="border-white/10 bg-white/[0.04]">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent className="flex flex-col border-white/10 bg-background/95 p-6 backdrop-blur-2xl">
							<div className="flex items-center justify-between mb-8">
								<Link href="/" className="flex items-center space-x-2">
									<span className="font-bold text-2xl text-gradient">Portfolio</span>
								</Link>
							</div>
							<nav className="flex flex-col gap-4">
								{siteConfig.mainNav.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className={`text-base font-medium transition-colors hover:text-primary ${pathname === item.href ? 'text-primary' : 'text-muted-foreground'
											}`}
									>
										{item.title}
									</Link>
								))}
							</nav>
							<div className="mt-auto pt-4">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" className="w-full justify-between">
											Social Links
											<ChevronDown className="h-4 w-4 ml-2" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem asChild>
											<Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
												GitHub
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
												LinkedIn
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
												Twitter
											</Link>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</SheetContent>
					</Sheet>
				</div>

				{/* Desktop actions */}
				<div className="hidden md:flex items-center gap-4">
					<Link href="/contact">
						<Button className="shadow-[0_18px_40px_-24px_rgba(88,211,255,0.9)]">Contact Me</Button>
					</Link>
				</div>
			</div>
		</motion.header>
	);
}
