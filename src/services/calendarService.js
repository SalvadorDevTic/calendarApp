export const monthString = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const daysString = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

export const getViewCalendar = (year, month) => {
  //crea la fecha en formato date de visualizacion del calendario
  let dateView = new Date(new Date().setFullYear(year, month, 1));

  //Equivale a un dia en milisegundos
  const oneDay = 86400000;

  //dia de la semana
  let dayWeek = dateView.getDay() - 1 == -1 ? 6 : dateView.getDay() - 1;

  let startCalendarView = dateView.getTime() - oneDay * dayWeek;
  let endCalendarView = startCalendarView + oneDay * 42;
  let result = { view: [], year: year, month: month };
  let counter = 0;

  while (startCalendarView < endCalendarView) {
    let dateTemp = new Date(startCalendarView);

    if (counter === 35 && dateTemp.getMonth() > month) break;

    result.view[counter] = {
      id: startCalendarView,
      date: {
        year: dateTemp.getFullYear(),
        month: dateTemp.getMonth(),
        day: dateTemp.getDate(),
      },
    };
    startCalendarView += oneDay;
    counter++;
  }

  return result;
};
