import React, { useState } from "react";
import "./Calendar.css";
import MonthsView from "./MonthsView";
import YearsView from "./YearsView";

const Calendar = (props) => {
  const {
    // defaultDate,
    onDateSelect,
    highlightedDates,
    handleMouseOver,
    handleMouseLeave,
    datesToBeSelected,
    minDate,
    maxDate,
  } = props;
  // const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(
    highlightedDates.length > 0
      ? new Date(highlightedDates[0])
      : maxDate &&
        new Date(new Date(maxDate).setHours(23, 59, 59, 999)).getTime() <=
          new Date().getTime()
      ? new Date(maxDate)
      : minDate &&
        new Date(new Date(minDate).setHours(0, 0, 0, 0)).getTime() >=
          new Date().getTime()
      ? new Date(minDate)
      : new Date()
  );
  const [view, setView] = useState("days");
  const [years, setYears] = useState({});

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDateClick = (day, prevOrNextMonth) => {
    let newMonth;
    if (prevOrNextMonth === "prev") {
      newMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        day
      );
    } else if (prevOrNextMonth === "next") {
      newMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        day
      );
    } else {
      newMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
    }
    setTimeout(() => {
      // setSelectedDate(newMonth);
      setCurrentMonth(newMonth);
      onDateSelect(formatDate(newMonth));
    }, 50);
  };

  const formatDate = (date) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const renderDays = () => {
    const startingDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    const totalDays = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const prevMonthDays = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    ).getDate();
    const daysInMonth = startingDay + totalDays;
    const rowsCount = Math.ceil(daysInMonth / 7);

    const days = [];

    // Render previous month days
    for (let i = prevMonthDays - startingDay + 1; i <= prevMonthDays; i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        i
      );
      const beforeMin =
        new Date(new Date(date).setHours(0, 0, 0, 0)).getTime() <
        new Date(new Date(minDate).setHours(0, 0, 0, 0)).getTime();
      days.push(
        <div
          key={`prev${i}`}
          onClick={() => {
            if (!beforeMin) handleDateClick(i, "prev");
          }}
          className={`day prev ${beforeMin ? "disabled" : ""}`}
        >
          {i}
        </div>
      );
    }

    function dateObject(date) {
      let dateObj = { date: "" };
      if (typeof date === "string" || date instanceof Date) {
        dateObj = {
          date,
        };
      } else {
        dateObj = date;
      }
      return dateObj;
    }

    function dateDiff(date1, date2) {
      const diffTime = Math.abs(new Date(date2) - new Date(date1));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }

    // Render current month days
    for (let i = 1; i <= totalDays; i++) {
      let isBeforeMinDate = false;
      let isAfterMaxDate = false;
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );

      if (minDate) {
        isBeforeMinDate =
          new Date(new Date(date).setHours(0, 0, 0, 0)).getTime() <
          new Date(new Date(minDate).setHours(0, 0, 0, 0)).getTime();
      }
      if (maxDate) {
        isAfterMaxDate =
          new Date(new Date(date).setHours(0, 0, 0, 0)).getTime() >
          new Date(new Date(maxDate).setHours(0, 0, 0, 0)).getTime();
      }

      let datesToHighlight = [];
      highlightedDates?.forEach((date, index) => {
        let dateObj = dateObject(date);
        const prevDate = highlightedDates[index - 1]
          ? dateObject(highlightedDates[index - 1])
          : null;
        const nextDate = highlightedDates[index + 1]
          ? dateObject(highlightedDates[index + 1])
          : null;

        if (!prevDate || dateDiff(dateObj.date, prevDate.date) > 1) {
          dateObj.highlightStart = true;
        }
        if (!nextDate || dateDiff(dateObj.date, nextDate.date) > 1) {
          dateObj.highlightEnd = true;
        }
        datesToHighlight?.push(dateObj);
      });

      const possibleDatesSelected = datesToBeSelected?.map((date, index) => {
        let dateObj = dateObject(date);
        const prevDate = datesToBeSelected[index - 1]
          ? dateObject(datesToBeSelected[index - 1])
          : null;
        const nextDate = datesToBeSelected[index + 1]
          ? dateObject(datesToBeSelected[index + 1])
          : null;

        if (!prevDate || dateDiff(dateObj.date, prevDate.date) > 1) {
          dateObj.possibleSelectionStart = true;
        }
        if (!nextDate || dateDiff(dateObj.date, nextDate.date) > 1) {
          dateObj.possibleSelectionEnd = true;
        }
        return dateObj;
      });

      const highlightedDate =
        datesToHighlight?.filter(
          (dateObj) =>
            new Date(dateObj.date).getDate() === i &&
            new Date(dateObj.date).getMonth() === currentMonth.getMonth() &&
            new Date(dateObj.date).getFullYear() === currentMonth.getFullYear()
        )?.[0] || null;

      const toBeSelected =
        possibleDatesSelected?.filter((dateObj) => {
          return (
            new Date(dateObj.date).getDate() === i &&
            new Date(dateObj.date).getMonth() === currentMonth.getMonth() &&
            new Date(dateObj.date).getFullYear() === currentMonth.getFullYear()
          );
        })?.[0] || null;
      const highlightedStyle = {};
      const classess = [];

      if (highlightedDate || toBeSelected) {
        classess.push("highlighted");
      }
      if (highlightedDate) {
        if (highlightedDate.highlightStart) {
          classess.push("highlight-start");
        }
        if (highlightedDate.highlightEnd) {
          classess.push("highlight-end");
        }
        if (highlightedDate?.textColor)
          highlightedStyle.color = highlightedDate?.textColor;
        if (highlightedDate?.bgColor)
          highlightedStyle.backgroundColor = highlightedDate.bgColor;
      }
      if (toBeSelected) {
        if (toBeSelected.possibleSelectionStart) {
          classess.push("possible-selection-start");
        }
        if (toBeSelected.possibleSelectionEnd) {
          classess.push("possible-selection-end");
        }
      }

      days.push(
        <div
          key={i}
          name={`${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${i.toString().padStart(2, "0")}`}
          onClick={() => {
            if (!isBeforeMinDate && !isAfterMaxDate) handleDateClick(i);
          }}
          className={`day ${classess.join(" ")} ${
            isBeforeMinDate || isAfterMaxDate ? "disabled" : ""
          }`}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <div
            name={`${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${i.toString().padStart(2, "0")}`}
            className={`day-number`}
            style={{ ...highlightedStyle }}
          >
            {i}
          </div>
        </div>
      );
    }

    // Render next month days
    const daysToAdd = rowsCount * 7 - days.length;
    for (let i = 1; i <= daysToAdd; i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        i
      );
      const afterMax =
        new Date(new Date(date).setHours(0, 0, 0, 0)).getTime() >
        new Date(new Date(maxDate).setHours(0, 0, 0, 0)).getTime();

      days.push(
        <div
          key={`next${i}`}
          onClick={() => !afterMax && handleDateClick(i, "next")}
          className={`day next ${afterMax ? "disabled" : ""}`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (view === "days") {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
      );
    } else if (view === "months") {
      setCurrentMonth(
        new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth())
      );
    } else if (view === "years") {
      const newDate = new Date(
        currentMonth.getFullYear() - 20,
        currentMonth.getMonth()
      );
      setCurrentMonth(newDate);
      yearOptions(newDate);
    }
  };

  const handleNextMonth = () => {
    if (view === "days") {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
      );
    } else if (view === "months") {
      setCurrentMonth(
        new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth())
      );
    } else if (view === "years") {
      const newDate = new Date(
        currentMonth.getFullYear() + 20,
        currentMonth.getMonth()
      );
      setCurrentMonth(newDate);
      yearOptions(newDate);
    }
  };

  const handleMonthChange = (month) => {
    setTimeout(() => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), month, 1));
      setView("days");
    }, 10);
  };

  const handleYearChange = (year) => {
    setTimeout(() => {
      setCurrentMonth(new Date(parseInt(year), currentMonth.getMonth(), 1));
      setView("months");
    }, 10);
  };

  const yearOptions = (date = currentMonth) => {
    const currentYear = date.getFullYear();
    const offset = currentYear % 20;
    const startingYear = currentYear - offset;
    const options = [];

    for (let i = 0; i < 20; i++) {
      options.push(startingYear + i);
    }
    setYears(options);
  };

  const handleViewUpdate = () => {
    let newView = "";
    switch (view) {
      case "days":
        newView = "months";
        break;
      case "months":
        newView = "years";
        yearOptions();
        break;

      default:
        break;
    }
    setTimeout(() => {
      if (newView) setView(newView);
    }, 10);
  };

  const checkIfPrevDisbaled = () => {
    let startOfTheMonth = new Date(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).setHours(
        0,
        0,
        0,
        0
      )
    );
    if (view === "months") {
      startOfTheMonth = new Date(
        new Date(currentMonth.getFullYear(), 0, 1).setHours(0, 0, 0, 0)
      );
    }
    if (view === "years") {
      startOfTheMonth = new Date(new Date(years[0], 0, 1).setHours(0, 0, 0, 0));
    }

    const beforeMinDate =
      minDate &&
      new Date(startOfTheMonth).getTime() <=
        new Date(new Date(minDate).setHours(0, 0, 0, 0)).getTime();

    return beforeMinDate;
  };

  const checkIfNextDisbaled = () => {
    let endOfTheMonth = new Date(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
      ).setHours(23, 59, 59, 999)
    );

    if (view === "months") {
      endOfTheMonth = new Date(
        new Date(currentMonth.getFullYear(), 12, 31).setHours(23, 59, 59, 999)
      );
    }
    if (view === "years") {
      endOfTheMonth = new Date(
        new Date(years[years.length - 1], 12, 31).setHours(23, 59, 59, 999)
      );
    }

    const afterMaxDate =
      maxDate &&
      new Date(endOfTheMonth).getTime() >=
        new Date(new Date(maxDate).setHours(23, 59, 59, 999)).getTime();

    return afterMaxDate;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={checkIfPrevDisbaled()}
        >
          <span>&#8249;</span>
        </button>
        <h3
          className={`${view === "years" ? "disabled" : ""}`}
          onClick={handleViewUpdate}
        >
          {view === "days" ? (
            <b>
              {months[currentMonth.getMonth()]}, {currentMonth.getFullYear()}
            </b>
          ) : null}
          {view === "months" ? <b>{currentMonth.getFullYear()}</b> : null}
          {view === "years" ? (
            <b>
              {years[0]}-{years[years.length - 1]}
            </b>
          ) : null}
        </h3>
        <button
          type="button"
          onClick={handleNextMonth}
          disabled={checkIfNextDisbaled()}
        >
          <span>&#8250;</span>
        </button>
      </div>
      {view === "days" ? (
        <>
          <div className="weekdays">
            {weekdays.map((day, index) => (
              <div key={index} className="weekday">
                {day}
              </div>
            ))}
          </div>
          <div className={`days`}>{renderDays()}</div>
        </>
      ) : null}
      {view === "months" ? (
        <MonthsView
          currentMonth={currentMonth}
          months={months}
          minDate={minDate}
          maxDate={maxDate}
          onMonthSelect={handleMonthChange}
        />
      ) : null}
      {view === "years" ? (
        <YearsView
          years={years}
          minDate={minDate}
          maxDate={maxDate}
          onYearSelect={handleYearChange}
        />
      ) : null}
    </div>
  );
};

export default Calendar;
