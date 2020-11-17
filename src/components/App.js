import React, { useContext, useEffect } from "react";
import { SeatContext } from "./SeatContext";
import { TicketWidget } from "./TicketWidget";
import GlobalStyles from "./GlobalStyles";
import { PurchaseModal } from "./PurchaseModal";

function App() {
  const {
    seatInfos: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);

  useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <TicketWidget />
      <PurchaseModal />
    </>
  );
}

export default App;
