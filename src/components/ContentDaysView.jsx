import { useEffect } from "react";

import { useState } from "react";

export const ContentDaysView = ({ dayView, daysView, content }) => {
  const [contentOfDay, setContentOfDay] = useState({});
  const { id, date, shifts } = contentOfDay;
  const { id: idDv, date: dateDv } = dayView;

  console.log("Aqui", dayView);
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
    <div className="text-[8px] max-h-screen min-h-24">
      {shifts &&
        shifts?.map((s) => {
          if (s.id == 0) return <div>Mañana</div>;

          if (s.id == 1) return <div>Tarde</div>;
        })}
    </div>
  );
};
