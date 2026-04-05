'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PanelSection } from '@/components/ui/panels/panel-shell';
import { blogPosts } from '@/lib/constants';

export function BlogPanel() {
	return (
		<div className="space-y-4">
			{blogPosts.map((post) => (
				<PanelSection key={post.slug} eyebrow="Writing" title={post.title}>
					<p className="text-xs uppercase tracking-[0.2em] text-slate-400">{post.date}</p>
					<p className="mt-3 text-sm leading-6 text-slate-300">{post.excerpt}</p>
					<Button className="mt-4" size="sm" variant="outline" asChild>
						<Link href={post.url} target="_blank" rel="noreferrer">
							Read article <ArrowUpRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</PanelSection>
			))}
		</div>
	);
}
