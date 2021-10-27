import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import React, { useState } from "react";


const CustomDatePicker = (props) => {
  const [date, setDate] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        variant="inline"
        label="Fecha"
        clearable
        disablePast
        showTodayButton
        autoOk
        format="yyyy/MM/dd HH:mm"
        value={date}
        onChange={(event) => {
          setDate(event);
          props.onFilterChanged(props.columnDef.tableData.id, event);
        }}
        KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
  );
};
export default CustomDatePicker;