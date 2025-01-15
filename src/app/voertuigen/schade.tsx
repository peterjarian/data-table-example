'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Row } from '@tanstack/react-table';
import { VoertuigContract } from './page';
import { Dot } from 'lucide-react';

export interface SchadeProps {
	data: Row<VoertuigContract>;
}

export default function Schade({ data }: SchadeProps) {
	let color: 'green' | 'orange';

	switch (data.original.schade!) {
		case 'CANCELED':
		case 'COMPLETED':
			color = 'green';
			break;
		case 'PENDING':
			color = 'orange';
			break;
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Dot
					color={color}
					size={64}
					aria-label={color.toLowerCase()}
				></Dot>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
