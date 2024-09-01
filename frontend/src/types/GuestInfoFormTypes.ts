export type Props = {
  hotelId: string;
  pricePerNight: number;
};

export type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};
