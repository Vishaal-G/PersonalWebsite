'use client';

import dynamic from 'next/dynamic';

const StadiumExperience = dynamic(() => import('@/components/scene/StadiumExperience'), {
	ssr: false,
	loading: () => null,
});

export default function Home() {
	return <StadiumExperience />;
}
