import { isClientExecuted } from "$lib/clientCheck";
import { clearAppState, loadAppState, writeAppState, type AppState } from "$lib/storage";
import type { CalendarEvent } from "../lib/types/component-types";


// As long as i only have sessionstaoge thius does not make senseif
let appState: AppState = { calendarEvents: [] }
if (isClientExecuted()) {
    appState = loadAppState();
}


export let calendarEvents: CalendarEvent[] = $state(appState.calendarEvents);

export function addCalendarEvent(calendarEvent: CalendarEvent) {
    calendarEvents.push(calendarEvent)
    writeAppState({ calendarEvents })
}

export function clearCalendarEvents(){
    clearAppState();
    calendarEvents.splice(0, calendarEvents.length);
}
