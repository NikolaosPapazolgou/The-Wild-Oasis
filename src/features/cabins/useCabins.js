import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

//Fetching the data for cabins using react query library
export function useCabins() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isPending, cabins, error };
}
