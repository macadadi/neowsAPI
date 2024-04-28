import { Button, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import BarChart from '../../common/BarChart'
import { NSDatePicker } from '../../common/NSDatePicker'
import NasaTable from '../../common/NasaTable'
import { dateToIOSstring } from '../../utils'
import { useFetchQuery } from '../data'
import { TAsteroidResponse } from '../data/types'
import { columns } from '../table'

function Neows() {
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null >(new Date())
    const [barChartData, setBarChartData] = useState<TAsteroidResponse[]>([])
    const { data, isLoading, status, error } = useFetchQuery({ start_date: dateToIOSstring(startDate), end_date: dateToIOSstring(endDate) })
    const handleResetValues =()=>{
        setStartDate(new Date())
        setEndDate(new Date())
    }
    return (
        <Stack  width={'fit-content'} mx={'auto'}> 
          <HStack
          alignSelf={'flex-end'}
           background={'white'}
                   borderColor='hue-navy.50'
                   borderBottomWidth='1px'
                   width={'fit-content'}
                   py={1}>
           <NSDatePicker  selectedDate={startDate}  handleDateUpdate={setStartDate}/>
           <Button color={'blue'} variant={'outline'} border={'0'} onClick={handleResetValues}>Today</Button>
           <NSDatePicker  selectedDate={endDate}  handleDateUpdate={setEndDate}/>
          </HStack>
            <VStack  mx={2}>
                <Text textDecoration={'underline'} fontSize={'larger'}  fontWeight={'800'}>Near Earth Object Web Service</Text>
                <Stack minW={'50%'} maxW={'100vw'}>
                    <NasaTable isLoading={isLoading}
                        tableData={data?.near_earth_objects}
                        columns={columns}
                        status={status} 
                        setBarChartData={setBarChartData}
                        error={error}/>
                        
                        <BarChart barChartData={barChartData}/>
                </Stack>
            </VStack>
        </Stack>
    )
}

export default Neows
