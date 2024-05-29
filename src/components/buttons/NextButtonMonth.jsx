export const NextButtonMonth = ({ handlerMonthView }) => {
  return (
    <>
      <button
        type="button"
        className="size-6 px-1 text-xs font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-700 focus:bg-green-300 "
        name="sumar"
        onClick={(event) => {
          handlerMonthView(event);
        }}
      >
        {/* {currentViewCalendar.month==11? monthString[0] + " de "+(currentViewCalendar.year + 1): monthString[currentViewCalendar.month+1]+ " "+(currentViewCalendar.year)} */}
        <img
          src="src/assets/chevron-rigth.svg"
          alt="flecha-izquierda"
          onClick={(event) => {
            handlerMonthView((event.target.name = "sumar"));
          }}
        />
      </button>
    </>
  );
};
