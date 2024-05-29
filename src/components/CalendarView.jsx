import { useEffect, useState } from "react";
import {
  daysString,
  getViewCalendar,
  monthString,
} from "../services/calendarService";
import { NextButtonMonth } from "./buttons/NextButtonMonth";
import { BackButtonMonth } from "./buttons/BackButtonMonth";
import { RowsNameDaysCalendar } from "./RowsNameDaysCalendar";
import { CardDayView } from "./CardDayView";
import {
  getAllContent,
  // getContentByRangeTimeStamp,
} from "../services/contentService";

export const CalendarView = () => {
  const [daysView, setDaysView] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    let aux = new Date();
    setDaysView(getViewCalendar(aux.getFullYear(), aux.getMonth()));
    setContent(getAllContent());
  }, []);

  const handlerMonthView = ({ target }) => {
    if (target?.name === "sumar") {
      if (daysView.month == 11) {
        setDaysView(getViewCalendar(daysView.year + 1, 0));
        return;
      } else {
        setDaysView(getViewCalendar(daysView.year, daysView.month + 1));
        return;
      }
    }

    if (target?.name === "restar") {
      if (daysView.month == 0) {
        setDaysView(getViewCalendar(daysView.year - 1, 11));

        return;
      } else {
        setDaysView(getViewCalendar(daysView.year, daysView.month - 1));
        return;
      }
    }
    return;
  };

  return (
    <>
      <div className="container m-auto p-4">
        <main className="text-3xl text-center w-full min-w-fit max-w-screen-sm justify-center m-auto">
          {/* ************HEAD-CALENDAR-BUTTONS-TITLE************** */}
          <div className="flex rounded-md justify-center gap-10 p-1 items-center bg-green-100 ">
            <BackButtonMonth handlerMonthView={handlerMonthView} />
            <h1 className=" text-2xl font-bold text-slate-800">
              {monthString[daysView.month] + " de " + daysView.year}
            </h1>
            <NextButtonMonth handlerMonthView={handlerMonthView} />
          </div>

          {/* ********ROW-NAMEDAYS-WEEK-CALENDAR********* */}
          <div className="grid gap-1 md:gap-2 grid-cols-7  justify-around p-0 sm:p-2">
            {daysString.map((name) => (
              <RowsNameDaysCalendar key={name} name={name} />
            ))}
            {/* ********CARD-DAYS-CALENDAR********* */}
            {daysView.view?.map((dayView) => (
              <CardDayView
                key={dayView.id}
                dayView={dayView}
                daysView={daysView}
                content={content}
              />
            ))}
            {/* ****************** */}
          </div>
        </main>
      </div>
    </>
  );
};
