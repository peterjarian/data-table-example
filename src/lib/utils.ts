import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function captalize(text: string): string {
	return text.split('')[0] + text.slice(1).toLowerCase();
}
