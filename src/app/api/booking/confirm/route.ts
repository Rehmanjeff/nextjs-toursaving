import { NextResponse } from 'next/server';
import { createBooking } from '@/app/services/iway';
import { generateRandomNumber } from '@/utils/common';
import prisma from '@/lib/prisma/client';
import { CarDataType, Supplier, Trip } from '@/data/types';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as ejs from 'ejs';
import { UserSearch } from '@/app/(client-components)/type';
import { getCurrencySymbol } from "@/utils/currency";

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
            throw data.error;
         }

         const result = await postBooking(search, trip, car, bookingNumber, data.data, data.data.order_id.toString(), 'iway');
         data = { success: true, error: null, data: result };
      } else {

         throw 'invalid booking information';
      }

   } catch (error) {

      data = { success: false, error: error as string, data: null };
   }
   
   return NextResponse.json({ response: data });
}

const postBooking = async (search: UserSearch, trip: Trip, car: CarDataType, bookingNumber: string, bookingData: any, lookupNumber: string, supplier: Supplier) => {

   try {

      const voucherFile = await generateVoucher({
         bookingNumber: bookingNumber,
         search: search,
         trip: trip,
         car: car,
         currencySymbol: getCurrencySymbol(car?.currency)
      });
      const bookingResult = await saveBooking(bookingNumber, bookingData, lookupNumber, voucherFile, supplier);
      await sendNotifications();

      return bookingResult;
   } catch (error) {

      throw error;
   }
}

const saveBooking = async (bookingNumber: string, bookingData: any, lookupNumber: string, voucherFileName: string, supplier: Supplier) => {
   try {
      
      // const result = await prisma.bookings.create({
      //    data: {
      //       booking_number: bookingNumber,
      //       booking_data: JSON.stringify(bookingData),
      //       lookup_number: lookupNumber,
      //       voucher: voucherFileName,
      //       supplier: supplier
      //    }
      // });

      return true;
   } catch (err) {

      throw err;
   }
}

const generateVoucher = async (data: any) => {
   try {

      const fileName = `IN-${generateRandomNumber(5)}.pdf`;
      const templateFile = 'public/pdf/templates/booking-invoice.ejs';
      const outputPath = `public/pdf/output/${fileName}`;

      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();

      const filePath = path.join(process.cwd(), templateFile);
      const templateContent = await require('fs').promises.readFile(filePath, 'utf8');
      const html = ejs.render(templateContent, data);
      await page.setContent(html);

      await page.pdf({ path: outputPath, format: 'A4' });
      return fileName;
      
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
