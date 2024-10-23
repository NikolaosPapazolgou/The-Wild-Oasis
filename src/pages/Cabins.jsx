import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setshowForm] = useState(false);
  return (
    //Returning a react Fragment because there is a main element provided to surround all the OutLet react Components
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort </p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setshowForm((showForm) => !showForm)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
