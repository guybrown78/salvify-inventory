
// // Helper function to convert date input value to Prisma DateTime
export const convertDateToISO8601 = (dateInputValue: string): string | null => {
  // Parse the date input value
  const parsedDate = new Date(dateInputValue);

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    // Handle invalid date input value (optional)
    console.error('Invalid date input value:', dateInputValue);
    return null; // or throw an error, return a default value, etc.
  }

	// Set the time part of the parsed date to the start of the day (00:00:00)
  parsedDate.setHours(0, 0, 0, 0);

  // Convert the parsed date to ISO 8601 format
  const isoDateString = parsedDate.toISOString();
  return isoDateString;
};
