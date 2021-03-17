// Reset to local time midnight to avoid mismatches due to timezones
export const toDateOnly = (date) => new Date(`${date.substring(0, 10)}T00:00:00`);

// Remove time from date to avoid mismatches due to timezones
export const toDateOnlyString = (date) => date?.toJSON().substring(0, 10) || '';
