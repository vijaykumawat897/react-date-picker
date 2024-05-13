import React from "react";

const MonthsView = ({
  currentMonth,
  months,
  onMonthSelect,
  minDate,
  maxDate,
}) => {
  const renderMonth = (month, index) => {
    const startOfTheMonth = new Date(
      new Date(currentMonth.getFullYear(), index, 1).setHours(0, 0, 0, 0)
    );
    const endOfTheMonth = new Date(
      new Date(currentMonth.getFullYear(), index + 1, 0).setHours(
        23,
        59,
        59,
        999
      )
    );

    const beforeMinDate =
      minDate &&
      new Date(endOfTheMonth).getTime() <
        new Date(new Date(minDate).setHours(0, 0, 0, 0)).getTime();

    const afterMaxDate =
      maxDate &&
      new Date(startOfTheMonth) >
        new Date(new Date(maxDate).setHours(23, 59, 59, 999)).getTime();

    const isDisbaled = beforeMinDate || afterMaxDate;

    return (
      <div
        className={`month-name ${isDisbaled ? "disabled" : ""}`}
        onClick={() => {
          !isDisbaled && onMonthSelect(index);
        }}
      >
        {month.slice(0, 3)}
      </div>
    );
  };
  return (
    <div className="months-container">
      {months.map((month, index) => (
        <div className="month">{renderMonth(month, index)}</div>
      ))}
    </div>
  );
};

export default MonthsView;
