import { faFile, faFileImage, faFilePdf, faFileWord } from '@fortawesome/free-solid-svg-icons';

export function getFileIcon(type: string) {
	if (type.includes('pdf')) {
		return faFilePdf;
	}
	if (type.includes('image')) {
		return faFileImage;
	}
	if (type.includes('word')) {
		return faFileWord;
	}
	return faFile;
}

export const getFileExtension = (filename: string): string => {
	return filename.split('.').pop()?.toLowerCase() || '';
};

export const formatCurrency = (amount: number, currency: string): string => {
	return amount.toLocaleString('en-US', {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
};

export const sameDay = (date1: Date, date2: Date): boolean => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};
