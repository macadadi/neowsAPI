import { Text } from "@chakra-ui/react"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { UpdateCell } from "../../common/UpdateCell"
import { RoundOffNumber } from "../../utils"
import { TAsteroidResponse } from "../data/types"



const columnHelper = createColumnHelper<TAsteroidResponse>() 


export const columns = [
  columnHelper.accessor('name', {
    id: 'name',
    header: () => <Text>Asteroid Name</Text>,
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('is_potentially_hazardous_asteroid', {
    id: 'is_potentially_hazardous_asteroid',
    cell: info => <Text>{info.getValue()? 'Yes' : 'No'}</Text>,
    header: () => <span>Potential Hazard</span>,
  }),
  columnHelper.accessor(row =>row?.close_approach_data[0]?.close_approach_date_full, {
    header: () => 'Time',
    id: 'Time',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor(row =>row?.estimated_diameter.meters.estimated_diameter_max, {
    header: () => 'Estimated Diameter',
    id: 'Estimated_Diameter',
    cell: info => <Text>{RoundOffNumber(info.renderValue() )}</Text>,
 
  }),
  columnHelper.accessor(row =>row?.close_approach_data[0]?.miss_distance?.kilometers, {
    header: () => 'Miss Distance',
    id: 'Miss_Distance',
    cell: info => <Text>{RoundOffNumber(info.renderValue())}</Text>,
  
  }),
  columnHelper.accessor('absolute_magnitude_h', {
    id: 'absolute_magnitude_h',
    header: () => <Text>Velocity</Text>,
  }),
  columnHelper.accessor('updates', {
      id: 'updates',
    header: () => <Text>Updates</Text>,
      cell: ({  row: { index, original}, }) => UpdateCell({  row: { index, original}, }) 
  }),
] as ColumnDef<TAsteroidResponse>[]


