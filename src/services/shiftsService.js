import { listShifts } from "../data/data";

const getTsDateForm = (st) => {
  let temp = st.split("-");
  return new Date(
    parseInt(temp[0]),
    parseInt(temp[1]) - 1,
    parseInt(temp[2]),
    0
  ).getTime()
};



export const createShiftsForm = (jsonF) => {

  let listShifts = listShifts
  const oneDay = 86400000;
  //FORMATEAMOS DATOS:

  //creamos rango completo en time-stamp
  let auxFromTs = getTsDateForm(jsonF.range.from);
  let auxToTs = getTsDateForm(jsonF.range.to);
  //Preferencias generales de turnos empleados:
  let quantityUserM = jsonF.quantityUserShifts.m;
  let quantityUsert = jsonF.quantityUserShifts.t;
  //Preferencias generales de empleados fijos
  let quantityDaysFree = jsonF.quantityDaysFree;
  //Preferencias generales dias cerrados
  let daysClosing =
    jsonF.daysClosingShop.length > 0 ? jsonF.daysClosingShop : undefined;
  //Hay temporadas?
  let isSeason = jsonF.ruleSeason.length > 0 ? jsonF.ruleSeason : undefined;
  //Hay dias de cierre total o parcial?    
  let listFormatTsDaysClosing = jsonF.daysClosingShop.length > 0 ? jsonF.daysClosingShop.map((d)=>{
    return {...d, dateTs: getTsDateForm(d.date)}
   }) : undefined;



  //Iniciamos array de contents
  let contents = [];

//************  WHILE-INICIO  *************
// ****************************************

  //CREAR ARRAY DE CONTENTS
  while (auxFromTs <= auxToTs) {

    //VARIABLES LOCALES WHILE
    let isClosingDay = undefined;
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
    //LOGICA WHILE...
  
    // Existen dias de cierre total o parcial?
    isClosingDay = listFormatTsDaysClosing?.find((d)=>
      d.dateTs== auxFromTs
    )

    //Si existen, los añadimos al content
    if (isClosingDay) {
      auxFromTs+=oneDay
      console.log('dentro')
      content = { ...content, clossing: isClosingDay };
      if(isClosingDay.tipo==0){
        contents.push(content)
        continue
      }
    }

    //Es temporada
    if(isSeason) {
      //Existe temporada.
      //Dentro del rango de alguna temporada
      isSeason.map((s) => {
        let auxDateFrom = getTsDateForm(s.range.from);
        let auxDateTo = getTsDateForm(s.range.to);
        if (auxDateFrom <= auxFromTs && auxDateTo >= auxFromTs) {
          content = { ...content, season: { ...s } };
        }
      });
    }

    //TODO...
    // if(content.season){
    //   content.season.quantityUserShifts.m
    //   content.season.quantityUserShifts.t
    //   content.season.quantityDaysFree
      
    // }else{

    // }

    //*********************** */
    contents.push(content);
    auxFromTs += oneDay;
  }
//************  WHILE-FIN  *************
// *************************************

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
