import React from "react";

const YearsView = ({ minDate, maxDate, years, onYearSelect }) => {
  const renderYear = (year) => {
    const startOfTheYear = new Date(new Date(year, 0, 1).setHours(0, 0, 0, 0));
    const endOfTheYear = new Date(
      new Date(year, 12, 31).setHours(23, 59, 59, 999)
    );

    const beforeMinDate =
      minDate &&
      new Date(endOfTheYear).getTime() <
        new Date(new Date(minDate).setHours(0, 0, 0, 0)).getTime();

    const afterMaxDate =
      maxDate &&
      new Date(startOfTheYear) >
        new Date(new Date(maxDate).setHours(23, 59, 59, 999)).getTime();

    const isDisbaled = beforeMinDate || afterMaxDate;

    return (
      <div
        className={`year-name ${isDisbaled ? "disabled" : ""}`}
        onClick={() => {
          !isDisbaled && onYearSelect(year);
        }}
      >
        {year}
      </div>
    );
  };
  return (
    <div className="years-container">
      {years.map((year) => (
        <div className="year">{renderYear(year)}</div>
      ))}
    </div>
  );
};

export default YearsView;
