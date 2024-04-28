import { useQuery } from '@tanstack/react-query';
import { getAsteroids } from './request';
import { DateRange, TAPIResponse } from './types';



const transformData = (item: TAPIResponse) => {
    const resultList = Object.values(item?.data?.near_earth_objects).flat();
    return { near_earth_objects: resultList }
};

export const useFetchQuery = ({ start_date, end_date }: DateRange) => {
    const { data, isLoading, error, status } = useQuery({ queryKey: ['/feed', { start_date, end_date }], queryFn: getAsteroids, select: transformData })
   return {data, isLoading, error, status}
}
