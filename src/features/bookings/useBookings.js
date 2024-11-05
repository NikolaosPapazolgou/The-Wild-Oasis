import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  //Getting the query Client created in the App in order to create a prefetching feature for the pagination
  const queryClient = useQueryClient();
  // Retrieve query parameters from the URL, allowing dynamic sorting, filtering, and pagination
  const [searchParams] = useSearchParams();

  // Get the sort order from the URL; defaults to sorting by startDate in descending order
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  // Get the filter value (booking status) from the URL, if any
  const filterValue = searchParams.get("status");

  // PAGINATION: Get the page number from the URL, defaulting to page 1 if not specified
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // Parse sorting parameters into field and direction for the database query
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Set up filtering options; default to null if no filter is specified or if it's set to "all"
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // QUERY: Fetch bookings data using React Query's useQuery hook
  const { isPending, data, error } = useQuery({
    // queryKey defines dependencies for re-fetching data when any key part changes
    queryKey: ["bookings", filter, sortBy, page],
    // queryFn executes getBookings with the current filter, sortBy, and page options
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Extract bookings data with a fallback to an empty array if undefined
  const bookings = data?.data || [];
  // Extract count of bookings with a fallback to 0 if undefined
  const count = data?.count || 0;
  //PRE-FETCHING
  //Calculating the current Pages by dividing the total results of bookigns and the predefined size of the pages

  const pageCount = Math.ceil(count / PAGE_SIZE);
  //Guard claus in order to not fetch data from the API that doesn't exist (Prevents from fetching data that donot exist )
  if (page < pageCount) {
    queryClient.prefetchQuery({
      // queryKey defines dependencies for re-fetching data when any key part changes
      queryKey: ["bookings", filter, sortBy, page + 1],
      // queryFn executes getBookings with the current filter, sortBy, and page options
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > pageCount) {
    queryClient.prefetchQuery({
      // queryKey defines dependencies for re-fetching data when any key part changes
      queryKey: ["bookings", filter, sortBy, page - 1],
      // queryFn executes getBookings with the current filter, sortBy, and page options
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  // Return relevant data and loading/error states to the component
  return { isPending, bookings, error, count };
}
