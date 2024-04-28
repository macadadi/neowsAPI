import Request from "../../requests";
import { TAPIResponse, TQueryKey } from "./types";

export const getAsteroids = ({ queryKey }: TQueryKey): Promise<TAPIResponse> => {
    const [queryURL, params] = queryKey
    return Request.get({
      url: queryURL,
      params:{...params}
    })
  }