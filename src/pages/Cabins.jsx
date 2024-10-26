import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable-2.jsx";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  return (
    //Returning a react Fragment because there is a main element provided to surround all the OutLet react Components
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort </p>
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
