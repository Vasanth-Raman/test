import React, { useState, useEffect, useRef } from "react";
import styles from "./DateInput.module.css";
import SendArrow from "../../../../assets/icons/send-arrow.svg";
import RightArrow from "../../../../assets/icons/angle-right-solid.svg";
import LeftArrow from "../../../../assets/icons/angle-left-solid.svg";

const DateInput = ({ onUserInput }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const calendarRef = useRef(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    setError(false);
  };

  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const dates = [];
    for (let i = 0; i < firstDay; i++) {
      dates.push(<div key={`empty-${i}`} className={styles.empty}></div>);
    }

    for (let date = 1; date <= lastDate; date++) {
      const fullDate = new Date(year, month, date);
      dates.push(
        <div
          key={date}
          className={`${styles.date} ${
            selectedDate?.getTime() === fullDate.getTime()
              ? styles.selected
              : ""
          }`}
          onClick={() => handleDateClick(fullDate)}
        >
          {date}
        </div>
      );
    }

    return dates;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handlePrevYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
    );
  };

  const handleNextYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1)
    );
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  const handleError = () => {
    if (selectedDate === null) {
      setError(true);
    } else {
      setError(false);
    }
  };
 
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dateInput}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          disabled={disabled ? true : false}
          value={selectedDate ? selectedDate.toLocaleDateString() : ""}
          onClick={() => setShowCalendar(!showCalendar)}
          readOnly
          autoFocus
          onBlur={handleError}
          placeholder="Select a date"
          className={disabled ? styles.disabled : styles.input}
        />
        <div
          className={disabled ? styles.disabledArrow : styles.arrowImg}
          onClick={
            error
              ? () => null
              : () => {
                  setDisabled(true);
                  onUserInput(selectedDate.toLocaleDateString());
                }
          }
        >
          <img src={SendArrow} alt="send arrow" />
        </div>
      </div>

      {showCalendar && (
        <div ref={calendarRef} className={styles.calendar}>
          <div className={styles.calendarHeader}>
            <div className={styles.leftHeader}>
              <img
                className={styles.yearArrow}
                src={LeftArrow}
                alt="previous arrow"
                onClick={handlePrevYear}
              />

              <span className={styles.monthYear}>
                {currentDate.toLocaleString("default", { month: "long" })}&nbsp;
                {currentDate.getFullYear()}
              </span>

              <img
                className={styles.yearArrow}
                src={RightArrow}
                alt="next arrow"
                onClick={handleNextYear}
              />
            </div>
            <div className={styles.rightHeader}>
              <img
                className={styles.monthArrow}
                src={LeftArrow}
                alt="previous arrow"
                onClick={handlePrevMonth}
              />

              <img
                className={styles.monthArrow}
                src={RightArrow}
                alt="next arrow"
                onClick={handleNextMonth}
              />
            </div>
          </div>
          <div className={styles.calendarBody}>
            <div className={styles.calendarDays}>
              <div>SUN</div>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div>SAT</div>
            </div>
            <div className={styles.calendarDates}>{renderCalendar()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateInput;
