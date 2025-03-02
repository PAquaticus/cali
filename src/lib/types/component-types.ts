export type CalendarEvent = {
    reoccuring: boolean;
    pushNotification: boolean;
    name: string;
    startTime: Date;
    endTime: Date;
};

export function isCalendarEvent(calendarEvent: unknown): calendarEvent is CalendarEvent {
    if (typeof calendarEvent !== 'object' || !calendarEvent) {
        return false;
    }

    const {startTime, endTime} = calendarEvent as CalendarEvent;
    if (!(startTime instanceof Date) || !(endTime instanceof Date)){
        return false;
    }

    return [
        "reoccuring",
        "pushNotification",
        "name",
        "startTime",
        "endTime"
    ].every(field => field in calendarEvent);
}


export type CalendarTask = {
    pushNotification: boolean;
    name: string;
    startTime: Date;
};
