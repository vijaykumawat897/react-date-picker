export function formatDate(momentObj, formatString) {
  const tokens = {
    YYYY: momentObj.getFullYear(), // Full year
    YY: String(momentObj.getFullYear()).slice(-2), // Last two digits of year
    M: momentObj.getMonth() + 1, // Month without leading zero
    MM: String(momentObj.getMonth() + 1).padStart(2, "0"), // Two-digit month (0-based index)
    MMM: momentObj.toLocaleString("default", { month: "short" }), // Short month name
    MMMM: momentObj.toLocaleString("default", { month: "long" }), // Full month name
    D: momentObj.getDate(), // Day without leading zero
    DD: String(momentObj.getDate()).padStart(2, "0"), // Two-digit day of the month
    Do: momentObj.getDate() + getOrdinalSuffix(momentObj.getDate()), // Day with ordinal (1st, 2nd, 3rd, etc.)
    H: momentObj.getHours(), // 24-hour format without leading zero
    HH: String(momentObj.getHours()).padStart(2, "0"), // Two-digit 24-hour format
    h: momentObj.getHours() % 12 || 12, // 12-hour format without leading zero
    hh: String(momentObj.getHours() % 12 || 12).padStart(2, "0"), // Two-digit 12-hour format
    m: momentObj.getMinutes(), // Minute without leading zero
    mm: String(momentObj.getMinutes()).padStart(2, "0"), // Two-digit minute
    s: momentObj.getSeconds(), // Second without leading zero
    ss: String(momentObj.getSeconds()).padStart(2, "0"), // Two-digit second
    A: momentObj.getHours() >= 12 ? "PM" : "AM", // Uppercase AM/PM
    a: momentObj.getHours() >= 12 ? "pm" : "am", // Lowercase am/pm
    dddd: momentObj.toLocaleString("default", { weekday: "long" }), // Full weekday name
    ddd: momentObj.toLocaleString("default", { weekday: "short" }), // Short weekday name
    d: momentObj.getDay(), // Day of the week (0-6)
  };

  // Helper function to get ordinal suffix for days
  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return "th"; // handles 11th to 19th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // Replace format string tokens with actual values
  return formatString.replace(
    /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
    (match) => {
      // If the match is in the tokens, replace it; otherwise return the match
      return tokens[match] !== undefined ? tokens[match] : match;
    }
  );
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
