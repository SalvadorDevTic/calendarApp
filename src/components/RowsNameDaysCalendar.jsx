export const RowsNameDaysCalendar = ({ name }) => {
  return (
    <div
      key={name}
      className="font-serif  text-center text-[10px] min-w-fit font-semibold sm:text-xs md:text-sm opacity-100 "
    >
      {name}
    </div>
  );
};
