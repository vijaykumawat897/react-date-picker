export function formatDate(date, format) {
  const dayIndex = new Date(date).getDay();
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
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

  const formatTokens = {
    dddd: dayNames[dayIndex],
    ddd: dayNames[dayIndex].slice(0, 3),
    DD: String(day).padStart(2, "0"),
    D: day,
    MMMM: monthNames[month],
    MMM: monthNames[month].slice(0, 3),
    MM: String(month + 1).padStart(2, "0"),
    M: month + 1,
    YYYY: year,
    YY: String(year).slice(-2),
  };

  const regex = new RegExp(Object.keys(formatTokens).join("|"), "g");
  return format.replace(regex, (match) => formatTokens[match]);
}

export const defaultRelativeOptions = [
  {
    label: "Today",
    amount: 0,
    action: "sub",
    unit: "day",
  },
  {
    label: "Last 7 Days",
    amount: 7,
    action: "sub",
    unit: "day",
  },
  {
    label: "Last 14 Days",
    amount: 14,
    action: "sub",
    unit: "day",
  },
  {
    label: "Last 30 Days",
    amount: 30,
    action: "sub",
    unit: "day",
  },
  {
    label: "Last 60 Days",
    amount: 60,
    action: "sub",
    unit: "day",
  },
  {
    label: "Last 90 Days",
    amount: 90,
    action: "sub",
    unit: "day",
  },
];

export const getEndDateOnOption = (option) => {
  const date = new Date();

  if (option.unit === "day") date.setDate(date.getDate() - option.amount);
  if (option.unit === "week") date.setDate(date.getDate() - option.amount * 7);
  if (option.unit === "month") date.setMonth(date.getMonth() - option.amount);
  if (option.unit === "year")
    date.setFullYear(date.getFullYear() - option.amount);

  return date;
};
