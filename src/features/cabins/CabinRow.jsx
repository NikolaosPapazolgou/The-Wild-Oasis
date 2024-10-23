import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  //A react query hook to get the client
  const queryClient = useQueryClient();
  //Using the useMutation hook in order to mutate the cabins data(specifically deleting a cabin)
  //The useMutation hook takes a mutationFn that is a async function, which interacts with the database and creates a mutation-update to the cabins table
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
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
  return (
    <TableRow role="row">
      <Img src={cabin.image} />
      <Cabin>{cabin.name}</Cabin>
      <div>Fits up to {cabin.maxCapacity} guests </div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      <Discount>{formatCurrency(cabin.discount)}</Discount>
      <button disabled={isDeleting} onClick={() => mutate(cabin.id)}>
        Delete
      </button>
    </TableRow>
  );
}
