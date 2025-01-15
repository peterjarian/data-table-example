'use client';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export type VoertuigType = 'AUTO' | 'CARAVAN' | 'CAMPER';

export type VoertuigStatus =
	| 'AVAILABLE'
	| 'RENTED'
	| 'IN_REPAIR'
	| 'DECOMMISSIONED';

export type SchademeldingStatus = 'PENDING' | 'CANCELED' | 'COMPLETED';

export interface VoertuigContract {
	kenteken: string;
	naam: string;
	soort: VoertuigType;
	zitplaatsen: number;
	status: VoertuigStatus;
	prijs: number;
	afbeeldingUrl: string;
	jaar: number;
	schade?: SchademeldingStatus;
}

export default function Page() {
	const [data] = useState<VoertuigContract[]>([
		{
			kenteken: '3-TNS-91',
			naam: 'Mercedes C-klasse',
			soort: 'AUTO',
			zitplaatsen: 5,
			status: 'AVAILABLE',
			prijs: 300,
			afbeeldingUrl: '', // empty because we won't use it inside tables
			jaar: 2018,
			schade: 'PENDING',
		},
		{
			kenteken: '5-RGD-76',
			naam: 'Audi RS6',
			soort: 'AUTO',
			zitplaatsen: 5,
			status: 'RENTED',
			prijs: 400,
			afbeeldingUrl: '', // empty because we won't use it inside tables
			jaar: 2021,
		},
	]);

	return (
		<>
			<h1 className="text-4xl">Table demonstration</h1>

			<div className="container mx-auto py-10">
				<DataTable columns={columns} data={data} />

				<Dialog>
					<DialogTrigger asChild>
						<Button className="mt-2">Nieuw</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you absolutely sure?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will
								permanently delete your account and remove your
								data from our servers.
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
}
