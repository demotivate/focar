'use client'

import "flatpickr/dist/themes/material_green.css";

import { useRef } from "react";
import Flatpickr from "react-flatpickr";

const CustomInput = ({ value, defaultValue, inputRef, ...props } : any) => {
    return <input {...props} defaultValue={defaultValue} ref={inputRef} />;
};

interface updateDate{
    update: Function
}

export default function DatePicker({update} : updateDate) {
    const fp = useRef(null);

    return (
        <div>
        <Flatpickr ref={fp}
        onClose={(selectedDates, instance) => {
            // selectedDates
            // dateStr
            // instance
            const year = String(selectedDates[0].getFullYear())
            const month = (selectedDates[0].getMonth() + 1 < 10) ? '0' + String(selectedDates[0].getMonth() + 1) : String(selectedDates[0].getMonth() + 1)
            const day = (selectedDates[0].getDate() < 10) ? '0' + String(selectedDates[0].getDate()) : String(selectedDates[0].getDate())
            const fullDate = year + '-' + month + '-' + day
            console.log("Full Date:", fullDate)
            update(fullDate)
        }}
        />
        {/* <button
            type="button"
            onClick={() => {
            if (!fp?.current?.flatpickr) return;
            fp.current.flatpickr.clear();
            }}
        >
            Clear
        </button> */}
        </div>
    );
}