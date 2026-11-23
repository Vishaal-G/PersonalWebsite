'use client';

import { Play } from 'lucide-react';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

/** Inline video player with the project image as its poster. */
export function ProjectVideo({ title, image, video }: { title: string; image: string; video?: string }) {
	if (!video) {
		// eslint-disable-next-line @next/next/no-img-element
		return <img src={image} alt={`${title} screenshot`} className="aspect-video w-full object-cover" />;
	}

	return (
		<video
			className="aspect-video w-full bg-black object-cover"
			src={video}
			poster={image}
			controls
			playsInline
			preload="none"
			aria-label={`${title} demo video`}
		/>
	);
}

/** Thumbnail that opens the demo video in a modal. */
export function ProjectThumbnail({ title, image, video }: { title: string; image: string; video?: string }) {
	const thumb = (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={image}
			alt={`${title} screenshot`}
			loading="lazy"
			className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
		/>
	);

	if (!video) return <div className="overflow-hidden">{thumb}</div>;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button className="relative block w-full overflow-hidden text-left" aria-label={`Play ${title} demo`}>
					{thumb}
					<span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors group-hover:bg-black/40">
						<span className="flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-black opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
							<Play className="h-3.5 w-3.5 fill-current" />
							Watch demo
						</span>
					</span>
				</button>
			</DialogTrigger>
			<DialogContent className="max-w-4xl gap-3 border-border bg-card p-3 sm:rounded-xl">
				<DialogTitle className="px-1 pt-1 text-sm font-medium">{title} demo</DialogTitle>
				<video className="aspect-video w-full rounded-lg bg-black" src={video} poster={image} controls autoPlay playsInline />
			</DialogContent>
		</Dialog>
	);
}
