export function getUnixTimestamp(date: Date): number {
	return (date.getTime() / 1000) | 0;
}
