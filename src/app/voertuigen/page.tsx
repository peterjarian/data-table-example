'use client';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormMessage, FormField, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type VoertuigType = 'AUTO' | 'CARAVAN' | 'CAMPER';

export type VoertuigStatus = 'AVAILABLE' | 'RENTED' | 'IN_REPAIR' | 'DECOMMISSIONED';

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

const formSchema = z.object({
	kenteken: z.string({ required_error: 'Kenteken is verplicht.' }),
	naam: z.string({ required_error: 'Naam is verplicht.' }),
	soort: z.string({ required_error: 'Soort is verplicht.' }),
	zitplaatsen: z
		.number({ required_error: 'Zitplaatsen is verplicht.' })
		.min(1, 'Er moet minimaal 1 zitplaats zijn')
		.max(12, 'Er mogen maximaal 12 zitplaatsen zijn.'),
	prijs: z.number({ required_error: 'Prijs is verplicht.' }).min(1, 'Prijs moet minimaal 1 euro zijn/'),
	jaar: z
		.number({ required_error: 'Jaar is verplicht.' })
		.min(2000, 'Een voertuig moet uit het jaar 2000 of later komen.')
		.max(new Date().getFullYear(), `Een voertuig moet uit het jaar ${new Date().getFullYear()} of eerder komen.`),
	afbeeldingUrl: z.string({ required_error: 'Afbeelding URL is verplicht.' }),
});

export default function Page() {
	const [data] = useState<VoertuigContract[]>([
		{
			kenteken: '3-TNS-91',
			naam: 'Mercedes C-klasse',
			soort: 'AUTO',
			zitplaatsen: 5,
			status: 'AVAILABLE',
			prijs: 300,
			afbeeldingUrl: '/mercedes-c-klasse.png', // empty because we won't use it inside tables
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
			afbeeldingUrl: '/audi-rs6.png', // empty because we won't use it inside tables
			jaar: 2021,
		},
	]);

	const [dialogOpen, setDialogOpen] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			console.log(values);
			setDialogOpen(false);
		} catch (error) {
			console.error('Form submission error', error);
			toast.error('Failed to submit the form. Please try again.');
		}
	}

	return (
		<>
			<div className="container mx-auto py-10">
				<h1 className="text-3xl font-medium mb-3">Voertuigen</h1>

				<DataTable columns={columns} data={data} />

				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<DialogTrigger asChild>
						<Button className="mt-2">Nieuw</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Voertuig aanmaken</DialogTitle>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-8 max-w-3xl mx-auto py-10"
									id="create-voertuig"
								>
									<div className="grid grid-cols-12 gap-4">
										<div className="col-span-6">
											<FormField
												control={form.control}
												name="kenteken"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Kenteken</FormLabel>
														<FormControl>
															<Input placeholder="3-TNS-91" type="text" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<div className="col-span-6">
											<FormField
												control={form.control}
												name="naam"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Naam</FormLabel>
														<FormControl>
															<Input placeholder="Mercedes C-klasse" type="text" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									<div className="grid grid-cols-12 gap-4">
										<div className="col-span-6">
											<FormField
												control={form.control}
												name="soort"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Soort</FormLabel>
														<Select onValueChange={field.onChange}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Maak je keuze" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="AUTO">Auto</SelectItem>
																<SelectItem value="CAMPER">Caravan</SelectItem>
																<SelectItem value="CARAVAN">Caravan</SelectItem>
															</SelectContent>
														</Select>

														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<div className="col-span-6">
											<FormField
												control={form.control}
												name="zitplaatsen"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Zitplaatsen</FormLabel>
														<FormControl>
															<Input
																type="number"
																{...field}
																onChange={(e) =>
																	field.onChange(e.target.value ? Number(e.target.value) : undefined)
																}
																placeholder="5"
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									<div className="grid grid-cols-12 gap-4">
										<div className="col-span-6">
											<FormField
												control={form.control}
												name="prijs"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Prijs</FormLabel>
														<FormControl>
															<Input placeholder="400" type="number" {...field} />
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<div className="col-span-6">
											<FormField
												control={form.control}
												name="jaar"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Bouwjaar</FormLabel>
														<FormControl>
															<Input
																placeholder="2018"
																type="number"
																{...field}
																onChange={(e) =>
																	field.onChange(e.target.value ? Number(e.target.value) : undefined)
																}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									<FormField
										control={form.control}
										name="afbeeldingUrl"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Afbeelding URL</FormLabel>
												<FormControl>
													<Input placeholder="/mercedes-c-klasse.png" type="text" {...field} />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</form>
							</Form>
						</DialogHeader>
						<DialogFooter>
							<Button form="create-voertuig" type="submit">
								Aanmaken
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
}
