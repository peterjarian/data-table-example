'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Row } from '@tanstack/react-table';
import { VoertuigContract } from './page';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

export interface ActionCellProps {
	data: Row<VoertuigContract>;
}

const formSchema = z.object({
	naam: z.string(),
	soort: z.string(),
	zitplaatsen: z.number(),
	prijs: z.number(),
	jaar: z.number(),
	afbeeldingUrl: z.string(),
});

export default function ActionCell({ data }: ActionCellProps) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	/**
	 * Function to delete whatever
	 */
	function onDelete() {
		// use the data.original to get the values used for finding out what to delete
		// ...
		// await backend.deleteVoertuig(data.original.kenteken);
		// ...

		console.log(`Deleting ${data.original.kenteken}`);
		setDialogOpen(false);
	}

	/**
	 * Runs on submitting of the form
	 */
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
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setDialogOpen(true)}>Edit</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{data.original.naam}</DialogTitle>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8 max-w-3xl mx-auto py-10"
							id="verander-voertuig"
						>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-4">
									<FormField
										control={form.control}
										name="naam"
										defaultValue={data.original.naam}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Naam</FormLabel>
												<FormControl>
													<Input
														type="text"
														{...field}
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
										name="soort"
										defaultValue={data.original.soort}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Soort</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue
																placeholder={
																	data
																		.original
																		.soort
																}
															/>
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="AUTO">
															Auto
														</SelectItem>
														<SelectItem value="CAMPER">
															Caravan
														</SelectItem>
														<SelectItem value="CARAVAN">
															Caravan
														</SelectItem>
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
										defaultValue={data.original.zitplaatsen}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Zitplaatsen
												</FormLabel>
												<FormControl>
													<Input
														type="number"
														{...field}
														onChange={(e) =>
															field.onChange(
																e.target.value
																	? Number(
																			e
																				.target
																				.value
																	  )
																	: undefined
															)
														}
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
										defaultValue={data.original.prijs}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Prijs</FormLabel>
												<FormControl>
													<Input
														type="number"
														{...field}
														onChange={(e) =>
															field.onChange(
																e.target.value
																	? Number(
																			e
																				.target
																				.value
																	  )
																	: undefined
															)
														}
													/>
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
										defaultValue={data.original.jaar}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Bouwjaar</FormLabel>
												<FormControl>
													<Input
														type="number"
														{...field}
														onChange={(e) =>
															field.onChange(
																e.target.value
																	? Number(
																			e
																				.target
																				.value
																	  )
																	: undefined
															)
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
								defaultValue={data.original.afbeeldingUrl}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Afbeelding URL</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</DialogHeader>
				<DialogFooter>
					<Button
						onClick={onDelete}
						className="bg-red-600 hover:bg-red-700"
					>
						Verwijder
					</Button>
					<Button form="verander-voertuig" type="submit">
						Aanpassen
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
