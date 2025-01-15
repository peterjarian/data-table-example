'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
	return (
		<div className="flex justify-center items-center h-screen flex-col">
			<h1 className="text-3xl font-medium mb-4">Shadcn table example</h1>
			<Link href="/voertuigen">
				<Button>Go to demo</Button>
			</Link>
		</div>
	);
}
