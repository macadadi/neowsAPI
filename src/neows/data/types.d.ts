export type DateRange = {
    start_date: string;
    end_date: string;
}

export type TQueryKey = {
    queryKey: [string, DateRange]
}



export type TAsteroidResponse = {
    name : string
    absolute_magnitude_h: number
    is_potentially_hazardous_asteroid: boolean
    close_approach_data : {
        close_approach_date_full: Date
        miss_distance :{
            kilometers: number
        }
    }[]
    updates: string
    estimated_diameter :{
        meters : {
            estimated_diameter_max : number
        }
    }
}

export type TAPIResponse = {
    data: {
        near_earth_objects: TAsteroidResponse[]
    }
}

export type TError = {
    isNetworkError: boolean
    http_error: "BAD_REQUEST"
}

export type TUpdateCell ={
    row :{
        index : number
        original: TAsteroidResponse
    }
 }