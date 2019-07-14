function formatTime(minutes) {
	const mins = minutes % 60;
	minutes -= mins;

	const hours = (minutes / 60) % 24;
	minutes -= hours * 60;

	const days = minutes / (24 * 60);

	return `${days} day(s) ${hours} hour(s) ${mins} minute(s).`;
}

formatTime(59);