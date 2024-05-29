export const BackButtonMonth = ({ handlerMonthView }) => {
  return (
    <>
      <button
        type="button"
        className="size-6 px-1 text-xs font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-700  focus:bg-green-300 "
        name="restar"
        onClick={(event) => {
          handlerMonthView(event);
        }}
      >
        <img
          src="src/assets/chevron-left.svg"
          alt="flecha-izquierda"
          onClick={(event) => {
            handlerMonthView((event.target.name = "restar"));
          }}
        />
      </button>
      {/* {currentViewCalendar.month==0? monthString[11] + " de "+(currentViewCalendar.year - 1): monthString[currentViewCalendar.month-1]+ " "+(currentViewCalendar.year)} */}
    </>
  );
};
