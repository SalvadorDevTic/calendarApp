import { useEffect } from "react";

import { useState } from "react";

export const ContentDaysView = ({ dayView, daysView, content }) => {
  const [contentOfDay, setContentOfDay] = useState({});
  const { id, date, shifts } = contentOfDay;
  const { date: dateDv } = dayView;

  // console.log("Aqui", dayView);
  useEffect(() => {
    let aux = {};
    if (content.length > 0) {
      aux = content.find(
        (c) =>
          dateDv.year == c.date?.year &&
          dateDv.month == c.date?.month &&
          dateDv.day == c.date?.day
      );
      if (aux) setContentOfDay(aux);
    }
  }, [content]);

  return (
    <div className="text-[8px] max-h-screen min-h-3 ">
      {shifts &&
        shifts?.map((s) => (
          <div key={s.id}>
            {s.id == 0 && (
              <div key={s.id} className="pb-2 bg-sky-100 ">
                <span className=" font-bold  flex justify-center">Mañana</span>
                {s.users &&
                  s.users.map((u) => (
                    <div
                      key={u.id}
                      className={
                        (u.id == 0 &&
                          "bg-yellow-300 mx-2 rounded-xl flex justify-center shadow-md ") ||
                        (u.id == 1 &&
                          "bg-purple-300  mx-2 rounded-xl flex justify-center shadow-md ")
                      }
                    >
                      {u.username}
                    </div>
                  ))}
              </div>
            )}

            {s.id == 1 && (
              <div key={s.id} className="pb-2 bg-orange-100 rounded-b-md">
                <span className=" font-bold  flex justify-center">Tarde</span>
                {s.users &&
                  s.users.map((u) => (
                    <div
                      key={u.id}
                      className={
                        (u.id == 0 &&
                          "bg-yellow-300 mx-2 rounded-xl flex justify-center shadow-md ") ||
                        (u.id == 1 &&
                          "bg-purple-300  mx-2 rounded-xl flex justify-center shadow-md ")
                      }
                    >
                      {u.username}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
