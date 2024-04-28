import { Button, Stack } from "@chakra-ui/react";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

type TDatePicker ={
    selectedDate : Date | null
    handleDateUpdate:React.Dispatch<React.SetStateAction<Date | null>>
}

export const NSDatePicker = ({selectedDate, handleDateUpdate}: TDatePicker) => {
  
    const CustomInput = forwardRef<
    HTMLButtonElement,
    {
      value?: string;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }
  >(({ value, onClick }, ref) => (
    <Button variant={'outline'} onClick={onClick} ref={ref}>
      {value}
    </Button>
  ));

  return ( <Stack width={'fit-content'} mx={8}>
      <DatePicker 
      selected={selectedDate} 
      selectsEnd
      onChange={(date) => handleDateUpdate(date)}
      onSelect={(date) =>  handleDateUpdate(date)}
       customInput={<CustomInput />} />
    </Stack>
  );
}
