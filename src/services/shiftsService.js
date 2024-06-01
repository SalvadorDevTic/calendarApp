const obtenerTsOfStringDate = (st) => {
  let temp = st.split("-");
  return new Date().setFullYear(
    parseInt(temp[0]),
    parseInt(temp[1]) - 1,
    parseInt(temp[2])
  );
};
export const createShiftsForm = (jsonF) => {
  const oneDay = 86400000;
  //FORMATEAMOS DATOS:
  //creamos rango completo en time-stamp
  let auxFromTs = obtenerTsOfStringDate(jsonF.range.from);
  let auxToTs = obtenerTsOfStringDate(jsonF.range.to);
  //Preferencias turnos empleados:
  let quantityUserM = jsonF.quantityUserShifts.m;
  let quantityUsert = jsonF.quantityUserShifts.t;
  //Preferencias empleados
  let quantityDaysFree = jsonF.quantityDaysFree;
  //Preferencias dias cerrados
  let daysClosing =
    jsonF.daysClosingShop.length > 0 ? jsonF.daysClosingShop : undefined;
  let isSeason = jsonF.ruleSeason.length > 0 ? jsonF.ruleSeason : undefined;

  //Iniciamos array de contents
  let contents = [];
  //CREAR ARRAY DE CONTENTS
  while (auxFromTs <= auxToTs) {
    let auxDate = new Date(auxFromTs);
    let content = {
      id: auxFromTs,
      date: {
        year: auxDate.getFullYear(),
        month: auxDate.getMonth(),
        day: auxDate.getDate(),
      },
    };

    //************************** */
    //Aqui maneja las condiciones para crear los turnos...
    //Es temporada
    if (isSeason) {
      //Existe temporada.
      //Dentro del rango de alguna temporada
      isSeason.map((s) => {
        let auxDateFrom = obtenerTsOfStringDate(s.range.from);
        let auxDateTo = obtenerTsOfStringDate(s.range.to);
        if (auxDateFrom <= auxFromTs && auxDateTo >= auxFromTs) {
          content = { ...content, season: { id: s.id } };
        } else {
          content = { ...content, season: false };
        }
      });
    } else {
      //No esta en temporada.
      console.log("normal");
    }
    //*********************** */
    contents.push(content);
    auxFromTs += oneDay;
  }
  console.log(contents);
};

let json = {
  id: 1717237869425,
  range: {
    from: "2024-06-01",
    to: "2024-07-01",
  },
  quantityUserShifts: {
    m: 1,
    t: 1,
  },
  quantityDaysFree: 2,
  daysClosingShop: [
    {
      id: 0,
      date: "2024-06-01",
      type: 0,
    },
  ],
  ruleSeason: [
    {
      range: {
        from: "2024-06-10",
        to: "2024-06-15",
      },
      quantityUserShifts: {
        m: 1,
        t: 1,
      },
      quantityDaysFree: 1,
      id: 1717237864131,
    },
  ],
};

let cj = {
  id: 1704110695800,
  date: {
    day: 1,
    month: 0,
    year: 2024,
  },
  shifts: [
    {
      id: 0,
      tipo: "Mañana",
      users: [
        {
          id: 1,
          username: "Maria",
          email: "maria@correo.com",
          role: "responsable",
          label: "plantilla",
        },
      ],
    },
    {
      id: 1,
      tipo: "Tarde",
      users: [
        {
          id: 0,
          username: "Marcos",
          email: "marcos@correo.com",
          role: "responsable",
          label: "plantilla",
        },
      ],
    },
  ],
};

// createShiftsForm();
