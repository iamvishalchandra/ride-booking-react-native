import { Ride } from "@/types/type";
import db from "../db";

export const createRide = async (
  {
    destination_address,
    destination_latitude,
    destination_longitude,
    driver_id,
    fare_price,
    origin_address,
    origin_latitude,
    origin_longitude,
    payment_status,
    ride_time,
  }: Ride,
  user_id: string
) =>
  await db`
    INSERT INTO rides ( 
        origin_address, 
        destination_address, 
        origin_latitude, 
        origin_longitude, 
        destination_latitude, 
        destination_longitude, 
        ride_time, 
        fare_price, 
        payment_status, 
        driver_id, 
        user_id
        ) VALUES (
            ${origin_address},
            ${destination_address},
          ${origin_latitude},
          ${origin_longitude},
          ${destination_latitude},
          ${destination_longitude},
          ${ride_time},
          ${fare_price},
          ${payment_status},
          ${driver_id},
          ${user_id}
          )
          RETURNING *;
          `;
