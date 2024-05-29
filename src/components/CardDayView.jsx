import { ContentDaysView } from "./ContentDaysView";

export const CardDayView = ({ dayView, daysView, content }) => {
  return (
    <div
      className={
        dayView?.date?.month == daysView.month
          ? false
            ? "shadow-lg rounded-md  text-center text-xs  min-w-fit  text-[10px] animate__animated animate__pulse animate__fast"
            : "shadow-lg rounded-md  text-center text-xs  min-w-fit  text-[10px]"
          : false
          ? "shadow-lg rounded-md  text-center text-xs  min-w-fit  text-[10px]  opacity-50 animate__animated animate__pulse animate__fast"
          : "shadow-lg rounded-md  text-center text-xs  min-w-fit  text-[10px]  opacity-50"
      }
      onDoubleClick={() => {
        onDayClick(dayView);
      }}
      onClick={(event) => {
        console.log(event.nativeEvent.pageX);
      }}
    >
      <span className="bg-red-500 opacity-90 rounded-t-md text-white font-bold  flex justify-center items-center">
        {dayView?.date?.day}
      </span>
      {/* Renderizar el contenido del day */}
      <ContentDaysView
        dayView={dayView}
        daysView={daysView}
        content={content}
      />
    </div>
  );
};
