import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import { Seat } from "./Seat";

export const TicketWidget = () => {
  // TODO: use values from Context
  const {
    seatInfos: { numOfRows, seatsPerRow, hasLoaded, seats },
  } = useContext(SeatContext);

  // console.log(seats);
  return (
    <Wrapper>
      {hasLoaded ? (
        range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>

              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const seat = seats[seatId];

                return (
                  <SeatWrapper key={seatId}>
                    <Seat
                      seatId={seatId}
                      seat={seat}
                      rowIndex={rowIndex}
                      seatIndex={seatIndex}
                      price={seat.price}
                      status={seat.isBooked}
                    />
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })
      ) : (
        <LoadingDiv>
          <CircularProgress size={80} />
        </LoadingDiv>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* border: 1px solid #ccc;
  border-radius: 3px; */
  padding: 8px;
  margin-top: 30px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const RowLabel = styled.div`
  font-weight: bold;
  padding: 15px;
  margin-right: 20px;
`;

const SeatWrapper = styled.div`
  background: #eee;
  padding: 15px;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const LoadingDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default TicketWidget;
