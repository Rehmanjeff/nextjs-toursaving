import { NextResponse } from 'next/server';
import { createBooking } from '@/app/services/iway';
import { generateRandomNumber } from '@/utils/common';

export async function POST(request: Request) {
  
   let data;
   const req = await request.json();
   const trip = req.trip;
   const search = req.search;
   const car = req.car;
   const lang = req.lang;
   const bookingNumber = `BN-${generateRandomNumber(8)}`;
   
   if (trip.supplier == 'iway') {
      data = await createBooking(trip, search, car, lang, bookingNumber);

      if (data.success) {
         await saveBooking(bookingNumber, data.data);
         await generateVoucher();
         await sendNotifications();
      }
   } else {
      data = { success: false, error: 'invalid booking information', data: null };
   }
   
   return NextResponse.json({ response: data });
}

const saveBooking = async (bookingNumber: string, bookingData: any) => {
   try {
      
   } catch (err) {
      
   }
}

const generateVoucher = async () => {
   try {
      
   } catch (err) {
      
   }
}

const sendNotifications = async () => {
   try {
      
   } catch (err) {
      
   }
}
