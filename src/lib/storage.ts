import { isClientExecuted } from "./clientCheck";
import type { CalendarEvent } from "./types/component-types";


const LOCALSTORAGE_KEY = "HABICAL_APPSTATE";


export type AppState = {
    calendarEvents: CalendarEvent[]
}



export function loadAppState(): AppState {



    // Session Storage 
    try {
        if (!isClientExecuted()) {
            throw Error("Can't execute client only code on server")
        }
        const localStorageContent = localStorage.getItem(LOCALSTORAGE_KEY);
        if (localStorageContent !== undefined && localStorageContent !== null) {
            const jsonParsedContent = JSON.parse(localStorageContent) as AppState;
            jsonParsedContent.calendarEvents.forEach(event => {
                event.startTime = new Date(event.startTime as unknown as string)
                event.endTime = new Date(event.endTime as unknown as string)
            })
            return jsonParsedContent as AppState;
        }
        return { calendarEvents: [] }
    }
    catch (error) {
        throw Error(`Error reading from localstorage:\n ${error}`);
    }



    // File based



    // DB based




    throw Error("Unreachable loadAppState")
}


export function writeAppState(appState: AppState) {

    // Session Storage 
    try {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(appState));
    }
    catch {
        throw Error("Error writing to localstorage")
    }



    // File based



    // DB based




}



export function clearAppState(){

    // Session Storage 
    try {
        localStorage.clear();
    }
    catch {
        throw Error("Error clearing localstorage")
    }
}
