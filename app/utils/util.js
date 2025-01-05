export function combineDateAndTime(date, time) {
    if (!date || !time) {
        return null;
    }
    const combined = `${date}T${time}:00`;
    const timestamp = new Date(combined).getTime();
    return timestamp;
}

export function convertTo12HourFormat(time24) {
    if (!time24) {
        return null;
    }
    const [hour, minute] = time24.split(":");
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert to 12-hour format (0 becomes 12)
    return `${hour12}:${minute}`;
}

export function convertTo24HourFormat(time12) {
    if (!time12) {
        return null;
    }
    const [time, period] = time12.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "AM" && hours === 12) {
        hours = 0;
    } else if (period === "PM" && hours !== 12) {
        hours += 12;
    }

    return { hours, minutes };
}

export function convertTo24HourFormatString(time12) {
    if (!time12) {
        return null;
    }

    const { hours, minutes } = convertTo24HourFormat(time12);

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
}

export function sortBy12HourTime(arr) {
    return arr.sort((a, b) => {
        const timeA = convertTo24HourFormat(a.startTime);
        const timeB = convertTo24HourFormat(b.startTime);

        if (timeA.hours === timeB.hours) {
            return timeA.minutes - timeB.minutes;
        }
        return timeA.hours - timeB.hours;
    });
}

export function formatTimestamp(timestamp) {
    const dateObj = new Date(timestamp);
    const date = dateObj.toISOString().split("T")[0];

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour clock

    const time = `${hours}:${minutes} ${ampm}`;
    return [date, time];
}