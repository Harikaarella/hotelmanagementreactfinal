
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [
    {
      id: 1,
      guest: "Renuka",
      room: "Deluxe Room",
      roomNo: "101",
      checkIn: "2026-10-15",
      checkOut: "2026-10-17",
      guests: 2,
      status: "Confirmed",
      amount: 8000,
    },
    {
      id: 2,
      guest: "Priya Reddy",
      room: "Suite Room",
      roomNo: "201",
      checkIn: "2026-10-18",
      checkOut: "2026-10-20",
      guests: 3,
      status: "Pending",
      amount: 15000,
    },
    {
      id: 3,
      guest: "Arjun Kumar",
      room: "Standard Room",
      roomNo: "102",
      checkIn: "2026-10-20",
      checkOut: "2026-10-22",
      guests: 2,
      status: "Confirmed",
      amount: 6000,
    },
    {
      id: 4,
      guest: "Sneha Patel",
      room: "Executive Room",
      roomNo: "301",
      checkIn: "2026-10-21",
      checkOut: "2026-10-24",
      guests: 2,
      status: "Checked In",
      amount: 18000,
    },
    {
      id: 5,
      guest: "Vikram Singh",
      room: "Deluxe Room",
      roomNo: "103",
      checkIn: "2026-10-22",
      checkOut: "2026-10-25",
      guests: 4,
      status: "Pending",
      amount: 14000,
    },
    {
      id: 6,
      guest: "Ananya Rao",
      room: "Suite Room",
      roomNo: "202",
      checkIn: "2026-10-23",
      checkOut: "2026-10-26",
      guests: 3,
      status: "Confirmed",
      amount: 22500,
    },
    {
      id: 7,
      guest: "Kiran Reddy",
      room: "Standard Room",
      roomNo: "104",
      checkIn: "2026-10-24",
      checkOut: "2026-10-26",
      guests: 1,
      status: "Cancelled",
      amount: 5000,
    },
    {
      id: 8,
      guest: "Meera Sharma",
      room: "Executive Room",
      roomNo: "302",
      checkIn: "2026-10-25",
      checkOut: "2026-10-28",
      guests: 2,
      status: "Checked In",
      amount: 18000,
    },
    {
      id: 9,
      guest: "Rohit Verma",
      room: "Deluxe Room",
      roomNo: "105",
      checkIn: "2026-10-27",
      checkOut: "2026-10-29",
      guests: 2,
      status: "Confirmed",
      amount: 8000,
    },
    {
      id: 10,
      guest: "Divya Ramesh",
      room: "Suite Room",
      roomNo: "203",
      checkIn: "2026-10-29",
      checkOut: "2026-11-01",
      guests: 4,
      status: "Pending",
      amount: 22500,
    },
  ],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push({
        ...action.payload,
        id: Date.now(),
      });
    },

    updateBooking: (state, action) => {
      const index = state.bookings.findIndex(
        (booking) => booking.id === action.payload.id
      );

      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },

    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
  },
});

export const { addBooking, updateBooking, deleteBooking } =
  bookingSlice.actions;

export default bookingSlice.reducer;
