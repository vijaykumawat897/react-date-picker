import React, { useEffect, useMemo, useState } from "react";
import Calendar from "../Calendar";
import {
  defaultRelativeOptions,
  formatDate,
  getEndDateOnOption,
} from "../utils";

const allDatesBewtweenRange = (startDate, endDate) => {
  const dates = [];
  for (
    var d = new Date(startDate);
    d <= new Date(endDate);
    d.setDate(d.getDate() + 1)
  ) {
    dates.push(new Date(d).toISOString().split("T")[0]);
  }
  return dates;
};

const PickerOptions = ({
  popupPosition,
  relativeOptions,
  setRelativeOptions,
  selectedRelativeDate,
  setSelectedRelativeDate,
  selectedDateString,
  setSelectedDateString,
  setInputHasFocus,
  defaultPickerType = "absolute",
  // defaultPickerType = "relative",
  selectionType,
  calendarSelectedDates,
  setCalendarSelectedDates,
  minDate,
  maxDate,
  dateFormat,
  inputKey,
  optionsKey,
}) => {
  const [pickerType, setPickerType] = useState(
    selectedRelativeDate
      ? "relative"
      : (selectionType === "range" && selectedDateString) ||
        selectionType === "single"
      ? "absolute"
      : defaultPickerType
  );

  const [datesToBeSelected, setDatesToBeSelected] = useState([]);

  const [optionSearch, setOptionSearch] = useState("");
  const [searchedRelativeOptions, setSearchedRelativeOptions] = useState([]);

  const highlightedDates = useMemo(() => {
    let dates = [];
    if (calendarSelectedDates.length > 0) {
      dates = allDatesBewtweenRange(
        calendarSelectedDates[0],
        calendarSelectedDates[calendarSelectedDates.length - 1]
      );
    }
    return dates;
  }, [calendarSelectedDates]);

  useEffect(() => {
    if (calendarSelectedDates.length > 0) {
      const formattedDates = calendarSelectedDates.map((date) =>
        formatDate(new Date(date), dateFormat)
      );
      let inputValue = formattedDates.join(" - ");
      setSelectedDateString(inputValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarSelectedDates]);

  useEffect(() => {
    const outsideClickListener = (event) => {
      const targetElement = document.getElementById(
        `date_picker_options_${optionsKey}`
      );
      const datePickerInput = document.getElementById(
        `date_picker_input_${inputKey}`
      );
      const calendarIcon = document.getElementById(`calendar_${inputKey}`);
      if (
        targetElement &&
        !targetElement.contains(event.target) &&
        event.target !== datePickerInput &&
        event.target !== calendarIcon
      ) {
        setInputHasFocus(false);
      }
    };
    document.addEventListener("click", outsideClickListener);
    return () => {
      document.removeEventListener("click", outsideClickListener);
    };
  }, [setInputHasFocus]);

  const handleRelativeOptionClick = (option) => {
    const date1 = new Date();
    const date2 = getEndDateOnOption(option);

    setSelectedRelativeDate(option.label);
    setSelectedDateString("");

    // put selected option in relative options
    if (optionSearch !== "" && searchedRelativeOptions.length > 0) {
      const tmpOptions = [...defaultRelativeOptions];

      if (
        !tmpOptions.some(
          (opt) =>
            opt.action === option.action &&
            opt.amount === option.amount &&
            opt.unit === option.unit
        )
      ) {
        tmpOptions.push(option);
      }
      setRelativeOptions(tmpOptions);
      setOptionSearch("");
      setSearchedRelativeOptions([]);
    }

    setCalendarSelectedDates(
      [
        date1.toISOString().split("T")[0],
        date2.toISOString().split("T")[0],
      ].sort()
    );
  };

  const handleDateSelect = (date) => {
    let dates = [...calendarSelectedDates];
    if (selectionType === "single" || dates.length === 2) {
      dates = [];
    }
    dates.push(date);
    dates.sort();
    setCalendarSelectedDates(dates);
    setDatesToBeSelected([]);
    setSelectedRelativeDate("");
  };

  const handleMouseOver = (event) => {
    if (calendarSelectedDates.length === 1 && selectionType === "range") {
      const startDate = calendarSelectedDates[0];
      const endDate = event.target.getAttribute("name");
      if (
        endDate &&
        (!minDate ||
          new Date(endDate).getTime() >=
            new Date(new Date(minDate).setHours(0, 0, 0, 0)).getTime()) &&
        (!maxDate ||
          new Date(endDate).getTime() <=
            new Date(new Date(maxDate).setHours(23, 59, 59, 999)).getTime())
      ) {
        const sorted = [startDate, endDate].sort();
        const dates = allDatesBewtweenRange(sorted[0], sorted[1]);
        dates.sort();
        setDatesToBeSelected(dates);
      }
    }
  };

  const handleMouseLeave = () => {
    setDatesToBeSelected([]);
  };

  const handleCustomRangeSearch = (value) => {
    setOptionSearch(value);
    if (!value) {
      // reset options
      setSearchedRelativeOptions([]);
      return;
    }

    // staring with number
    if (!value.match(/^\d/)) {
      return;
    }

    let numbers = value.match(/(\d+)/);
    let enteredNumber = parseInt(numbers[0]);
    let validUnits = ["Day", "Week", "Month", "Year"];
    let enteredUnit = value.substring(
      enteredNumber.toString().length,
      value.length
    );
    let customOptions = [];

    validUnits.forEach((unit) => {
      if (
        (!enteredUnit && (unit !== "Year" || enteredNumber < 6)) ||
        (`${unit}s`
          .toLocaleLowerCase()
          .includes(enteredUnit.toLocaleLowerCase()) &&
          (unit !== "Year" || enteredNumber < 6))
      ) {
        const option = {
          label: `Last ${enteredNumber} ${unit}${enteredNumber > 1 ? "s" : ""}`,
          amount: enteredNumber,
          action: "sub",
          unit: unit.toLocaleLowerCase(),
        };
        const date = getEndDateOnOption(option);
        if (minDate && new Date(date).getTime() < new Date(minDate).getTime()) {
          return;
        }
        if (maxDate && new Date(date).getTime() > new Date(maxDate).getTime()) {
          return;
        }
        customOptions.push(option);
      }
    });
    setOptionSearch(value);
    setSearchedRelativeOptions(customOptions);
  };

  const renderOptions = (options) => {
    return (
      <>
        {options.map((option, index) => (
          <p
            key={`relative_option_${index}`}
            className={`relative-option ${
              selectedRelativeDate === option.label ? "selected" : ""
            }`}
            onClick={() => handleRelativeOptionClick(option)}
          >
            {option.label}
          </p>
        ))}
      </>
    );
  };

  const toggleDatePickerType = (type) => {
    setTimeout(() => {
      setPickerType(type);
    }, 50);
  };

  return (
    <div
      className={`date-picker-options ${popupPosition}`}
      id={`date_picker_options_${optionsKey}`}
    >
      {pickerType === "relative" ? (
        <>
          <input
            className="option-search-input"
            value={optionSearch}
            placeholder="Custom range: 2d, 5w, 3m, 1y..."
            onChange={(e) => handleCustomRangeSearch(e.target.value)}
          />
          {optionSearch !== ""
            ? renderOptions(searchedRelativeOptions)
            : renderOptions(relativeOptions)}

          <hr className="divider" />
          <p
            className="relative-option absolute"
            onClick={() => toggleDatePickerType("absolute")}
          >
            Absolute date
            <span className="arrow right">&#10140;</span>
          </p>
        </>
      ) : null}
      {pickerType === "absolute" ? (
        <>
          <Calendar
            // defaultDate={new Date()}
            highlightedDates={highlightedDates}
            datesToBeSelected={datesToBeSelected}
            onDateSelect={handleDateSelect}
            handleMouseOver={handleMouseOver}
            handleMouseLeave={handleMouseLeave}
            selectionType={selectionType}
            minDate={minDate}
            maxDate={maxDate}
          />
          {selectionType === "range" ? (
            <>
              <hr className="divider" />
              <p
                className="relative-option"
                onClick={() => toggleDatePickerType("relative")}
              >
                <span className="arrow left">&#10140;</span>
                Relative date
              </p>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default PickerOptions;
