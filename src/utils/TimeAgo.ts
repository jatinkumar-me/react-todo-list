import { formatDistanceToNow } from "date-fns";

export const timeAgo = (timestamp: Date): string => {
    const timePeriod = formatDistanceToNow(timestamp);
    return `${timePeriod}`;

};

