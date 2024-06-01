import { CalendarView } from "./components/CalendarView";
import { FormShiftsCalendar } from "./components/forms/FormShiftsCalendar";

export const CalendarApp = () => {
  return <>{<FormShiftsCalendar /> || <CalendarView />}</>;
};
