import { NextResponse } from 'next/server';
import { createBooking } from '@/app/services/iway';
import { generateRandomNumber } from '@/utils/common';
import prisma from '@/lib/prisma/client';

export async function POST(request: Request) {
  
   let data;
   const req = await request.json();
   const trip = req.trip;
   const search = req.search;
   const car = req.car;
   const lang = req.lang;
   const bookingNumber = `BN-${generateRandomNumber(8)}`;
   
   try {
      
      if (trip.supplier == 'iway') {
         data = await createBooking(trip, search, car, lang, bookingNumber);
   
         if (!data.success) {
            throw data.error
         }

         const result = await postBooking(bookingNumber, data.data, data.data.order_id.toString())
         data = { success: true, error: null, data: result }
      } else {

         throw 'invalid booking information'
      }

   } catch (error) {

      data = { success: false, error: error as string, data: null };
   }
   
   return NextResponse.json({ response: data });
}

const postBooking = async (bookingNumber: string, bookingData: any, lookupNumber: string) => {

   try {

      const voucherFile = await generateVoucher();
      const bookingResult = await saveBooking(bookingNumber, bookingData, lookupNumber, voucherFile);
      await sendNotifications();

      return bookingResult;
   } catch (error) {

      throw error;
   }
}

const saveBooking = async (bookingNumber: string, bookingData: any, lookupNumber: string, voucherFileName: string) => {
   try {
      
      const result = await prisma.bookings.create({
         data: {
            booking_number: bookingNumber,
            booking_data: JSON.stringify(bookingData),
            lookup_number: lookupNumber,
            voucher: voucherFileName
         }
      });

      return result;
   } catch (err) {

      throw err;
   }
}

const generateVoucher = async () => {
   try {

      return 'abc.jpg';
   } catch (err) {
      throw err;
   }
}

const sendNotifications = async () => {
   try {
      
   } catch (err) {
      throw err;
   }
}
