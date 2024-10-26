import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  //A react query hook to get the client
  const queryClient = useQueryClient();
  //Using the useMutation hook in order to mutate the cabins data(specifically deleting a cabin)
  //The useMutation hook takes a mutationFn that is a async function, which interacts with the database and creates a mutation-update to the cabins table
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    //The onSuccess method is executed when the mutationFn is completed succesfully
    //It's a frequent pattern inorder to UPDATE THE UI to REFETCH THE TABLE DATA AFTER A MUTATION-UPDATE
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
