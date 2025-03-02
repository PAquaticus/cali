import type { CalendarEvent } from "../lib/types/component-types";



export let calendarEvents: CalendarEvent[] = $state([]);

export function addCalendarEvent(calendarEvent: CalendarEvent){
    calendarEvents.push(calendarEvent)
}
