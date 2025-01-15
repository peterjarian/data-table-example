'use client';

import { ColumnDef } from '@tanstack/react-table';
import { VoertuigContract } from './page';
import { Dot } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import ActionCell from './action-cell';

export const columns: ColumnDef<VoertuigContract>[] = [
	{
		accessorKey: 'kenteken',
		header: 'Kenteken',
	},
	{
		accessorKey: 'naam',
		header: 'Naam',
	},
	{
		accessorKey: 'soort',
		header: 'Soort',
		cell: ({ row }) => {
			switch (row.original.soort) {
				case 'AUTO':
					return 'Auto';
				case 'CAMPER':
					return 'Camper';
				case 'CARAVAN':
					return 'Caravan';
			}
		},
	},
	{
		accessorKey: 'zitplaatsen',
		header: 'Zitplaatsen',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			let color: 'red' | 'orange' | 'green' | 'black';

			switch (row.original.status) {
				case 'AVAILABLE':
					color = 'green';
					break;
				case 'DECOMMISSIONED':
					color = 'black';
					break;
				case 'IN_REPAIR':
					color = 'red';
					break;
				case 'RENTED':
					color = 'orange';
					break;
			}

			return (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							{' '}
							<Dot
								color={color}
								size={48}
								aria-label={color.toLowerCase()}
							></Dot>
						</TooltipTrigger>
						<TooltipContent>
							<p>
								{row.original.status.charAt(0).toUpperCase() +
									row.original.status.slice(1).toLowerCase()}
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			);
		},
	},
	{
		accessorKey: 'prijs',
		header: 'Prijs',
		cell: ({ row }) => `€ ${row.original.prijs}`,
	},
	{
		accessorKey: 'jaar',
		header: 'Jaar',
	},
	{
		id: 'beheren',
		cell: ({ row }) => <ActionCell data={row} />,
	},
];