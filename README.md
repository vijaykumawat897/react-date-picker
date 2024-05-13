
# React Date Picker

A lightweight plugin to select both **Single Date** and a **Date Range**.




## Features

- Single Date Selection
- Date Range Selection
- Relative and Absolute Picker Option
- Search on Relative Option 
- Month/Year Selection View


## Screenshots

Date Picker

![App Screenshot](https://raw.githubusercontent.com/vijaykumawat897/react-date-picker/main/screenshots/Screenshot%202024-05-14%20013002.png)


Relative Options

![App Screenshot](https://raw.githubusercontent.com/vijaykumawat897/react-date-picker/main/screenshots/Screenshot%202024-05-14%20013101.png)

Relative Search 

![App Screenshot](https://raw.githubusercontent.com/vijaykumawat897/react-date-picker/main/screenshots/Screenshot%202024-05-14%20013113.png)

Absolute Date Picker

![App Screenshot](https://raw.githubusercontent.com/vijaykumawat897/react-date-picker/main/screenshots/Screenshot%202024-05-14%20013025.png)

Month Selection

![App Screenshot](https://raw.githubusercontent.com/vijaykumawat897/react-date-picker/main/screenshots/Screenshot%202024-05-14%20013039.png)

Year Selection

![App Screenshot](https://raw.githubusercontent.com/vijaykumawat897/react-date-picker/main/screenshots/Screenshot%202024-05-14%20013046.png)



## Usage/Examples

Import css
```
import "@vj97/react-date-picker/dist/style.css";
```

Code Example
```javascript
import { DatePicker } from '@vj97/react-date-picker'

 <DatePicker 
    placeholder="Choose Date"
    selectionType="range"
    onChange={handleDateChange}
    />

function handleDateChange (dates) {
    console.log(dates)

    // output for single date will be string
    // output for date range will be object as below 
    // {stateDate: "", endDate: ""}
}
```




## Supported props

| Property name      | Type                      | Default              | Description                                                                                                                                                              |
| ------------------ | ------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| selectionType           | single/range  | single                  | Type of the picker
| dateFormat           | string | DD MMM, YYYY                 | Format of the date to be shown in the input                                                                                                                                                         |
| defaultSelectedDate      | string/date                    | NULL                  | Date to be selected by default                
| minDate      | string/date                    | NULL                  | Minimun date                                                                                                                                  |
| maxDate   | string/date                    | dark                  | Maximum date                                                                                                                                   |
| placeholder   | string                    | NULL               | Placeholder                                                                                                                                       |
| colors   | object                    | {}                 | Theme colors, refer below for supported colors                                                                                                                                  |
| showCalenderIcon            | boolean | true                  | To show calendar icon on input right                                                                                                                                                       |
| containerStyle          | style object                  | {}                  | Style of the input container              |
| inputStyle             | style object                   | {}                | Style of the input                                                                                                                 |
| containerClass             | string                   | NULL                | Custom class for input container                                                                                                                                 |
| inputClass               | string                   | NULL                | Custom class for input                                                                                                                                            |
| defaultPickerType        | relative/absolute                   | absolute                 | Picker type to be opened be default                                                                                                                                      |
| onChange              | function                   | n/a                 |                                                        Callback called when date is selected                                                                               |



#### Colors

```
{
    selection: "", // Highlight color for selected dates
    hover: "", // Background color when dates hoverd
    text: "", // Text color for picker 
    background: "", // Background color for date picker popup
}
```