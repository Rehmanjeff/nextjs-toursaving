import { NextResponse } from 'next/server';
import { createBooking } from '@/app/services/iway';
import { generateRandomNumber } from '@/utils/common';
import prisma from '@/app/services/prisma';
import { CarDataType, Supplier, Trip } from '@/data/types';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as ejs from 'ejs';
import { UserSearch } from '@/app/(client-components)/type';
import { getCurrencySymbol } from "@/utils/currency";
import { mailOptions, transporter } from '@/app/services/nodemailer';
import Mail from 'nodemailer/lib/mailer';

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
         const bookingResult = await createBooking(trip, search, car, lang, bookingNumber);
   
         if (!bookingResult.success) {
            throw bookingResult.error;
         }

         const result = await postBooking(search, trip, car, bookingNumber, bookingResult.data, bookingResult.data.order_id.toString(), 'iway');
         data = { success: true, error: null, data: bookingResult, booking: bookingNumber };
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
      await sendNotifications(search, trip, car, bookingNumber, supplier, voucherFile);

      return bookingResult;
   } catch (error) {

      throw error;
   }
}

const saveBooking = async (bookingNumber: string, bookingData: any, lookupNumber: string, voucherFileName: string, supplier: Supplier) => {
   try {
      
      const result = await prisma.bookings.create({
         data: {
            booking_number: bookingNumber,
            booking_data: JSON.stringify(bookingData),
            lookup_number: lookupNumber,
            voucher: voucherFileName,
            supplier: supplier
         }
      });

      return true;
   } catch (err) {

      throw err;
   }
}

const generateVoucher = async (data: any) => {
   try {

      const fileName = `IN-${generateRandomNumber(5)}.pdf`;
      const templateFile = 'src/templates/pdf/booking-invoice.ejs';
      const outputPath = `${process.env.BOOKING_VOUCHER_OUTPUT_DIR}/${fileName}`;

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

const sendNotifications = async (search: UserSearch, trip: Trip, car: CarDataType, bookingNumber: string, supplier: Supplier, voucherFile: string) => {
   try {

      const notifications = getNotifications(supplier);
      
      for (const notification of notifications) {
         if (notification.type === 'email') {
           await sendEmailNotification(notification, search, trip, car, bookingNumber, voucherFile);
         }
      }
   } catch (err) {
      // todo: add log to database for admin
      console.log(err);
   }
}

const getNotifications = (supplier: Supplier) => {

   return [
      {'type': 'email', 'recipient': 'customer'},
      {'type': 'email', 'recipient': 'admin'},
   ]
}

const sendEmailNotification = async (notification: {type: string, recipient: string}, search: UserSearch, trip: Trip, car: CarDataType, bookingNumber: string, voucherFile: string) => {
   try {
      const { subject, address, html, attachment } = await getDataForEmailNotification(notification, search, trip, car, bookingNumber, voucherFile);

      if (subject && address && html) {

         let mailData : Mail.Options = {
            ...mailOptions,
            to: address,
            subject: subject,
            html: html
         }

         if (attachment) {
            mailData.attachments = [
               { filename: voucherFile, path: attachment } 
            ]
         }

         await transporter.sendMail(mailData);
      }
   } catch (error) {
      throw error;
   }
}

const getDataForEmailNotification = async (notification: {type: string, recipient: string}, search: UserSearch, trip: Trip, car: CarDataType, bookingNumber: string, voucherFile: string) => {

   let address = null;
   let subject = null;
   let html = null;
   let attachment = null;
   let templateFile = ''

   if (notification.recipient == 'admin') {
      address = process.env.ADMIN_EMAIL;
      subject = process.env.BOOKING_NOTIFICATION_ADMIN_SUBJECT;
      templateFile = 'src/templates/email/admin/booking.ejs';
   } else if (notification.recipient == 'customer') {
      address = trip.passengers[0].email;
      subject = process.env.BOOKING_NOTIFICATION_CUSTOMER_SUBJECT;
      templateFile = 'src/templates/email/booking.ejs';
      attachment = `${process.env.BOOKING_VOUCHER_OUTPUT_DIR}/${voucherFile}`;
   }

   if (templateFile !== '') {
      const data = {
         bookingNumber: bookingNumber,
         search: search,
         trip: trip,
         car: car,
         currencySymbol: getCurrencySymbol(car?.currency)
      }
      const filePath = path.join(process.cwd(), templateFile);
      const templateContent = await require('fs').promises.readFile(filePath, 'utf8');
      html = ejs.render(templateContent, data);
   }

   return { subject, address, html, attachment };
}
