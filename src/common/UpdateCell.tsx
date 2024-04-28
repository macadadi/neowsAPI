import { Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TUpdateCell } from "../neows/data/types"


 export const UpdateCell = ({  row: { index, original} }: TUpdateCell) => {
    const data_key = `${original?.name}${index}${original?.close_approach_data[0]?.close_approach_date_full}`
      const initialValue = JSON.parse(localStorage.getItem(data_key)  ?? '{}')
      const [value, setValue] = useState(initialValue)
      useEffect(() => {
         if(typeof initialValue === 'string'){
            setValue(initialValue)
         }
         else{
            setValue('-')
         }
      }, [initialValue])

      return <Input
      border={0}
    borderColor={'green'}
    my={-1}
      size={'xs'}
          value={value as string}
          onChange={e =>{ setValue(e.target.value)
            localStorage.setItem(data_key, JSON.stringify(e.target.value))
        }  
        }
      />
  }

