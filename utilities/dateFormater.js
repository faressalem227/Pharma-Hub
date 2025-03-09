import moment from "moment";
export function formatDate(date, sepertae) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // Months are zero-based, so add 1
	const day = date.getDate();

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const formattedDate = `${year}-${month}-${day}`;

	const formattedTime = `${hours}:${minutes}:${seconds}`;

	const formattedTimeSeperate = `${hours}:${minutes}`;

	if (sepertae) {
		return [formattedDate, formattedTimeSeperate];
	} else {
		return `${formattedDate} ${formattedTime}`;
	}
}

export function getTimeDifference(startDate, endDate) {
	let date1;
	if (endDate == null) {
		date1 = new Date();
		date1.setHours(date1.getHours() + 3);
	} else {
		date1 = new Date(endDate);
	}

	const date2 = new Date(startDate);

	// Calculate the difference in milliseconds
	const diffInMs = date1 - date2;

	// Convert the difference to total hours, minutes, and seconds
	const totalHours = Math.floor(diffInMs / (1000 * 60 * 60));
	const totalMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
	const totalSeconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

	// Format the difference in hh:mm:ss
	const formattedHours = String(totalHours).padStart(2, "0");
	const formattedMinutes = String(totalMinutes).padStart(2, "0");
	const formattedSeconds = String(totalSeconds).padStart(2, "0");

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
export function getFormattedLocalDate(datee) {
	const date = datee ? new Date(datee) : new Date();

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");
	const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export const cairoTimeConverter = (date) => {
	return moment(date).tz("Africa/Cairo").format("YYYY-MM-DD HH:mm:ss");
};

export function getCurrentHour() {
	const date = new Date();
	return date.getHours();
}
export const priceFormatter = (t) => {
	if (t) {
	  return t.toLocaleString("en-EG");
	} else {
	  return t;
	}
  };
  