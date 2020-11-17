import React, { useContext } from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import styled from "styled-components";
import seatAvailable from "../assets/seat-available.svg";
import { BookingContext } from "./BookingContext";

export const Seat = ({ seat, rowIndex, seatIndex, price, status, seatId }) => {
  const {
    actions: { updatingBookingInfo },
  } = useContext(BookingContext);

  return (
    <>
      {status ? (
        <DisabledSeatButton disabled>
          <BookedSeatImg src={seatAvailable} />
        </DisabledSeatButton>
      ) : (
        <SeatButton
          onClick={(e) =>
            updatingBookingInfo({ seat, rowIndex, seatIndex, seatId })
          }
        >
          <Tippy content={<span>{price}$</span>}>
            <img src={seatAvailable} alt="A list of all the seats" />
          </Tippy>
        </SeatButton>
      )}
    </>
  );
};

const BookedSeatImg = styled.img`
  filter: grayscale(100%);
`;
const SeatButton = styled.button`
  border: 0px;
  &:hover {
    cursor: pointer;
  }
`;

const DisabledSeatButton = styled.button`
  border: 0px;
`;
