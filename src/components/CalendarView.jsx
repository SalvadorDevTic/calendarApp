import { useEffect, useState } from "react";
import {
  daysString,
  getViewCalendar,
  monthString,
} from "../services/calendarService";
import { NextButtonMonth } from "./buttons/NextButtonMonth";
import { BackButtonMonth } from "./buttons/BackButtonMonth";

export const CalendarView = () => {
  const [daysView, setDaysView] = useState([]);

  useEffect(() => {
    setDaysView(getViewCalendar(2024, 4));
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
          <div className="grid gap-1 md:gap-2 grid-cols-7 justify-around w-full p-0 sm:p-2">
            {daysString.map((day) => (
              <div
                key={day}
                className="font-serif  text-center text-[10px] min-w-fit font-semibold sm:text-xs md:text-sm opacity-100 "
              >
                {day}
              </div>
            ))}
            {/* ********CARD-DAYS-CALENDAR********* */}
            {daysView.view?.map((dia) => (
              // <p key={d.id}>{d.date.day}</p>
              <div
                key={dia.id}
                className={
                  dia.date.month == daysView.month
                    ? false
                      ? "shadow-lg rounded-md  text-center text-xs  min-w-fit  text-[10px] animate__animated animate__pulse animate__fast"
                      : "shadow-lg rounded-md  text-center text-xs  min-w-fit  text-[10px]"
                    : false
                    ? "shadow-lg rounded-md  text-center text-xs  min-w-fit  text-[10px]  opacity-50 animate__animated animate__pulse animate__fast"
                    : "shadow-lg rounded-md  text-center text-xs  min-w-fit  text-[10px]  opacity-50"
                }
                onDoubleClick={() => {
                  onDayClick(dia);
                }}
                onClick={(event) => {
                  console.log(event.nativeEvent.pageX);
                }}
              >
                <span className="bg-red-500 opacity-90 rounded-t-md text-white font-bold  flex justify-center items-center">
                  {dia.date.day}
                </span>
                {/* Renderizar el contenido del dia */}
                {dia.content ? (
                  <>
                    {/* Renderiza turnos*/}
                    {dia.content?.turnos.map((shift) => (
                      <ContentView key={shift.id} shift={shift} />
                    ))}
                  </>
                ) : (
                  <>
                    <br /> <br />
                  </>
                )}
              </div>
            ))}
            {/* ****************** */}
          </div>
        </main>
      </div>
    </>
  );
};
