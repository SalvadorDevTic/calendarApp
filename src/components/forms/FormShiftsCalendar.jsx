import { useEffect, useState } from "react";
import { createShiftsForm } from "../../services/shiftsService";
const auxDatefrom = new Date();

const auxDateto = () => {
  if (auxDatefrom.getMonth() == 11)
    return new Date().setFullYear(
      auxDatefrom.getFullYear() + 1,
      0,
      auxDatefrom.getDate()
    );

  return new Date(
    new Date().setFullYear(
      auxDatefrom.getFullYear(),
      auxDatefrom.getMonth() + 1,
      auxDatefrom.getDate()
    )
  ).getTime();
};

const initDateto = new Date(auxDateto());

const fromCurrentDay = {
  year: auxDatefrom.getFullYear(),
  month:
    (auxDatefrom.getMonth() + 1).toString().length == 1
      ? 0 + (auxDatefrom.getMonth() + 1).toString()
      : (auxDatefrom.getMonth() + 1).toString(),
  day:
    auxDatefrom.getDate().toString().length == 1
      ? 0 + auxDatefrom.getDate().toString()
      : auxDatefrom.getDate().toString(),
};

const toCurrentDay = {
  year: initDateto.getFullYear(),
  month:
    (initDateto.getMonth() + 1).toString().length == 1
      ? 0 + (initDateto.getMonth() + 1).toString()
      : (initDateto.getMonth() + 1).toString(),
  day:
    initDateto.getDate().toString().length == 1
      ? 0 + initDateto.getDate().toString()
      : initDateto.getDate().toString(),
};

const Initialsettings = {
  id: 0,
  range: {
    from: `${fromCurrentDay.year}-${fromCurrentDay.month}-${fromCurrentDay.day}`,
    to: `${toCurrentDay.year}-${toCurrentDay.month}-${toCurrentDay.day}`,
  },
  quantityUserShifts: { m: 1, t: 1 },
  quantityDaysFree: 2,
  daysClosingShop: [],
  ruleSeason: [],
};

const initialAddFormTempDayClose = {
  id: 0,
  date: `${fromCurrentDay.year}-${fromCurrentDay.month}-${fromCurrentDay.day}`,
  type: 0,
};

const initFormSeason = {
  range: {
    from: `${fromCurrentDay.year}-${fromCurrentDay.month}-${fromCurrentDay.day}`,
    to: `${toCurrentDay.year}-${toCurrentDay.month}-${toCurrentDay.day}`,
  },
  quantityUserShifts: { m: 1, t: 1 },
  quantityDaysFree: 1,
};

export const FormShiftsCalendar = () => {
  const [settings, setSettings] = useState(Initialsettings);
  const [addFormTempDayClose, setAddFormTempDayClose] = useState(
    initialAddFormTempDayClose
  );
  const [formSeason, setFormSeason] = useState(initFormSeason);
  const [error, setError] = useState({ errorFormDaysClose: false });
  const {
    id,
    range,
    quantityUserShifts,
    quantityDaysFree,
    daysClosingShop,
    ruleSeason,
  } = settings;

  const {
    range: rangeSeason,
    quantityUserShifts: quantityUserShiftsSeason,
    quantityDaysFree: quantityDaysFreeSeason,
  } = formSeason;

  useEffect(() => {
    setTimeout(() => {
      setError({ ...Error, errorFormDaysClose: false });
    }, 4000);
  }, [error.errorFormDaysClose]);

  const onChangeSettings = (target) => {
    const { name, value } = target;
    if ((name == "from" || name == "to") && range) {
      //Formatear fecha para rango de temporalidad o de dias cerrados.
      setSettings({ ...settings, range: { ...range, [name]: value } });
    }
    if (name == "m" || name == "t") {
      console.log({ ...quantityUserShifts, [name]: value });
      setSettings({
        ...settings,
        quantityUserShifts: { ...quantityUserShifts, [name]: value },
      });
    }

    if (name == "quantityDaysFree") {
      setSettings({
        ...settings,
        [name]: value,
      });
    }
  };

  const onSaveDayClose = () => {
    addFormTempDayClose;
    let listAux = daysClosingShop;
    let exists = listAux.find((d) => d.date == addFormTempDayClose.date);
    if (exists) {
      setError({ ...error, errorFormDaysClose: true });
    } else {
      listAux.push(addFormTempDayClose);
      setSettings({
        ...settings,
        daysClosingShop: [...listAux],
      });
    }
  };

  const onDaysClosing = (target) => {
    const { name, value } = target;
    setAddFormTempDayClose({
      ...addFormTempDayClose,
      id: Date.now(),
      [name]: value,
    });
  };

  const onListDeleteClose = (id) => {
    let toList = settings.daysClosingShop.filter((d) => d.id != id);
    setSettings({
      ...settings,
      daysClosingShop: [...toList],
    });
  };

  const onSeasonChange = (target) => {
    console.log("dentro");
    const { name, value } = target;
    console.log(name, value);
    if (name == "from" || name == "to") {
      setFormSeason({
        ...formSeason,
        range: { ...rangeSeason, [name]: value },
      });
    }
    if (name == "m" || name == "t") {
      setFormSeason({
        ...formSeason,
        quantityUserShifts: { ...quantityUserShiftsSeason, [name]: value },
      });
    }
    if (name == "quantityDaysFree") {
      console.log("free");
      setFormSeason({ ...formSeason, [name]: value });
    }
  };

  const onSaveSeason = () => {
    console.log("dentro");
    let list = ruleSeason;
    list.push({ ...formSeason, id: Date.now() });
    setSettings({ ...settings, ruleSeason: list });
    setFormSeason(initFormSeason);
  };

  const onListDeleteSeason = (id) => {
    let list = ruleSeason.filter((s) => s.id != id);
    setSettings({ ...settings, ruleSeason: list });
  };

  const onSaveFullFrom = () => {
    // console.log({ ...settings, id: Date.now() });
    createShiftsForm({ ...settings, id: Date.now() });
  };

  return (
    <div>
      <div className="container m-auto p-4 text-sm">
        <main className=" text-center w-full min-w-fit max-w-screen-sm justify-center m-auto">
          <div className="border rounded-md p-4 text-xs ">
            {/* RANGO HORARIO COMPLETO */}
            <div className="p-2 rounded-md flex flex-col justify-center">
              <span className="flex items-center py-2 font-semibold">
                Selecciona el rango para el que deseas crear el horario:
              </span>
              <div className="flex flex-row w-fit border px-4 rounded-md bg-sky-100 ">
                <div>
                  <label htmlFor="from">Desde: </label>
                  <input
                    className="font-sans border rounded-md m-1 px-1  "
                    name="from"
                    value={range.from}
                    type="date"
                    onChange={(event) => onChangeSettings(event.target)}
                  />
                </div>

                <div className="px-4">
                  <label htmlFor="to">hasta: </label>
                  <input
                    className="font-sans border rounded-md m-1 px-1 "
                    name="to"
                    value={range.to < range.from ? range.from : range.to}
                    type="date"
                    min={range.from}
                    onChange={(event) => onChangeSettings(event.target)}
                  />
                </div>
              </div>
            </div>

            {/* CANTIDAD TRABAJADORES POR TURNO */}
            <div className="p-2 rounded-md flex flex-col justify-center">
              <span className="flex items-center py-2 font-semibold">
                Introduce la cantidad de trabajadores por turno:
              </span>
              <div className="flex flex-row w-fit border px-4 rounded-md bg-sky-100 ">
                <div>
                  <label htmlFor="usersMorning">Mañana: </label>
                  <input
                    className="font-sans border rounded-md m-1 px-1 w-12 text-center "
                    name="m"
                    type="number"
                    value={quantityUserShifts.m}
                    onChange={(event) => onChangeSettings(event.target)}
                    min={0}
                  />
                </div>

                <div className="px-4">
                  <label htmlFor="to">Tarde: </label>
                  <input
                    className="font-sans border rounded-md m-1 px-1 w-12 text-center"
                    name="t"
                    type="number"
                    min={0}
                    value={quantityUserShifts.t}
                    onChange={(event) => onChangeSettings(event.target)}
                  />
                </div>
              </div>
            </div>

            {/* CANTIDAD DE DIAS LIBRES POR EMPLEADO FIJO A LA SEMANA */}
            <div className="p-2 rounded-md flex flex-col justify-center">
              <span className="flex items-center py-2 font-semibold">
                Indica cuantos dias libres tiene cada trabajador de plantilla a
                la semana:
              </span>
              <div className="flex flex-row w-fit border px-4 rounded-md bg-sky-100 ">
                <div>
                  <label htmlFor="from">Dias libres semanales: </label>
                  <input
                    className="font-sans border rounded-md m-1 px-1 w-12 text-center "
                    name="quantityDaysFree"
                    type="number"
                    value={quantityDaysFree}
                    min={0}
                    onChange={(event) => onChangeSettings(event.target)}
                  />
                </div>
              </div>
            </div>

            {/* DIAS DE CIERRE COMPLETO O PARCIAL */}
            <div className="p-2 rounded-md flex flex-col justify-center ">
              <span className="flex items-center py-2 font-semibold">
                Selecciona los dias de cierre completo o parcial:
              </span>
              <div className="w-fit border rounded-md bg-sky-100 p-2">
                <div className="flex min-w-fit items-center justify-between ">
                  <label htmlFor="from" className="min-w-fit justify-start">
                    Dia de cierre:
                  </label>
                  <input
                    className="font-sans border rounded-md m-1 px-1 min-w-fit"
                    name="date"
                    type="date"
                    value={addFormTempDayClose.date}
                    min={range.from}
                    max={range.to}
                    onChange={(event) => onDaysClosing(event.target)}
                  />
                </div>

                <div className="flex min-w-fit items-center justify-between ">
                  <label
                    htmlFor="from"
                    className="flex min-w-fit items-center justify-between"
                  >
                    Tipo de cierre:
                  </label>
                  <select
                    id="closingShifts"
                    className="font-sans border rounded-md m-1 px-1 min-w-fit "
                    name="type"
                    value={addFormTempDayClose.type}
                    onChange={(event) => onDaysClosing(event.target)}
                  >
                    <option defaultValue value="0">
                      Cerrado total
                    </option>
                    <option value="1">Cerrado tarde</option>
                    <option value="2">Cerrado mañana</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-1 text-center m-2 mb-2"
                  onClick={() => onSaveDayClose()}
                >
                  Añadir dia festivo
                </button>
                {error.errorFormDaysClose && (
                  <div className="text-red-600 ">Error: Dias Repetidos!</div>
                )}
              </div>
            </div>

            {/* LISTA DE DIAS CERRADOS COMPLETO O PARCIAL */}
            <div className="p-2 rounded-md flex flex-col justify-center ">
              {daysClosingShop.length > 0 && (
                <div className="w-fit border rounded-md bg-sky-100 p-2">
                  Días cerrados total o parcial
                  <div className="w-fit border rounded-md bg-white mt-2 ">
                    {daysClosingShop.map((d) => (
                      <div key={d.id} className="flex items-center">
                        <span className="px-4 py-0">{d.date}</span>
                        <span className="px-4 py-0">
                          {d.type == 0
                            ? "Cerrado total"
                            : d.type == 1
                            ? "Cerrado tarde"
                            : "Cerrado mañana"}
                        </span>
                        <div className="flex py-1 min-w-fit">
                          <button
                            type="button"
                            className=" px-3 mx-1  text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:bg-red-300  "
                            onClick={() => {
                              onListDeleteClose(d.id);
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* REGLAS DE TEMPORADA */}
            <span className="items-center py-2 font-semibold">
              Reglas de temporada
            </span>
            <div className="justify-center  border rounded-md bg-orange-50 p-2 mx-auto my-2 ">
              {/*(temporada) RANGO DE TEMPORADA */}
              <div className="p-2 rounded-md flex flex-col justify-center">
                <span className="flex items-center py-2 font-semibold">
                  Selecciona el rango de la temporada
                </span>
                <div className="flex flex-row w-fit border px-4 rounded-md bg-sky-100 ">
                  <div>
                    <label htmlFor="from">Desde: </label>
                    <input
                      className="font-sans border rounded-md m-1 px-1  "
                      name="from"
                      type="date"
                      min={range.from}
                      max={range.to}
                      value={rangeSeason.from}
                      onChange={(event) => onSeasonChange(event.target)}
                    />
                  </div>

                  <div className="px-4">
                    <label htmlFor="to">hasta: </label>
                    <input
                      className="font-sans border rounded-md m-1 px-1 "
                      name="to"
                      type="date"
                      min={range.from}
                      max={range.to}
                      value={rangeSeason.to}
                      onChange={(event) => onSeasonChange(event.target)}
                    />
                  </div>
                </div>
              </div>

              {/*(temporada) CANTIDAD TRABAJADORES POR TURNO */}
              <div className="p-2 rounded-md flex flex-col justify-center">
                <span className="flex items-center py-2 font-semibold">
                  Introduce la cantidad de trabajadores por turno:
                </span>
                <div className="flex flex-row w-fit border px-4 rounded-md bg-sky-100 ">
                  <div>
                    <label htmlFor="usersMorning">Mañana: </label>
                    <input
                      className="font-sans border rounded-md m-1 px-1 w-12 text-center "
                      name="m"
                      min={0}
                      value={quantityUserShiftsSeason.m}
                      type="number"
                      onChange={(event) => onSeasonChange(event.target)}
                    />
                  </div>
                  <div className="px-4">
                    <label htmlFor="to">Tarde: </label>
                    <input
                      className="font-sans border rounded-md m-1 px-1 w-12 text-center"
                      name="t"
                      type="number"
                      min={0}
                      value={quantityUserShiftsSeason.t}
                      onChange={(event) => onSeasonChange(event.target)}
                    />
                  </div>
                </div>
              </div>

              {/*(temporada) CANTIDAD DE DIAS LIBRES POR EMPLEADO FIJO A LA SEMANA */}
              <div className="p-2 rounded-md flex flex-col justify-center">
                <span className="flex items-center py-2 font-semibold">
                  Indica cuantos dias libres tiene cada trabajador de plantilla
                  a la semana:
                </span>
                <div className="flex flex-row w-fit border px-4 rounded-md bg-sky-100 ">
                  <div>
                    <label htmlFor="from">Dias libres semanales: </label>
                    <input
                      className="font-sans border rounded-md m-1 px-1 w-12 text-center "
                      name="quantityDaysFree"
                      type="number"
                      value={quantityDaysFreeSeason}
                      min={0}
                      onChange={(event) => onSeasonChange(event.target)}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="text-white bg-orange-700  hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-4 py-1 text-center m-2 mb-2"
                onClick={() => onSaveSeason()}
              >
                Guardar temporada
              </button>
              {error.errorFormDaysClose && (
                <div className="text-red-600 ">Error: Dias Repetidos!</div>
              )}
            </div>

            {/*(temporada)  LISTA DE TEMPORADAS */}
            <div className="p-2 rounded-md flex flex-col justify-center ">
              {ruleSeason.length > 0 && (
                <div className="w-fit border rounded-md bg-orange-100 p-2">
                  Lista de temporadas guardadas
                  <div className="w-fit border rounded-md bg-white mt-2 ">
                    {ruleSeason.map((s) => (
                      <div key={s.id} className="flex items-center">
                        <span className="px-4 py-0">{s.range?.from}</span>
                        <span className="px-4 py-0">{s.range?.to}</span>
                        <div className="flex py-1 min-w-fit">
                          <button
                            type="button"
                            className=" px-3 mx-1  text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:bg-red-300  "
                            onClick={() => {
                              onListDeleteSeason(s.id);
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                className="text-white bg-green-700  hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-1 text-center m-2 mb-2"
                onClick={() => onSaveFullFrom()}
              >
                Generar horario
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
