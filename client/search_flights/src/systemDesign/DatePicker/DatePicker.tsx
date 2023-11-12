import DatePicker from "react-datepicker";
import React from "react";

interface DatePickerProps {
    onChange: (date: Date) => void;
}

export const ReusableDatePicker: React.FC<DatePickerProps>  = (props) => {
    return <div>
        <label htmlFor='flightDate'>Data do Voo:</label>
        <DatePicker
            id='flightDate'
            onChange={props.onChange}
            dateFormat='dd/MM/yyyy'
        />
    </div>;
}