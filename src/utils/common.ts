export const isValidExpiration = (expiration : string) => {

   const [yearMonth, month] = expiration.split('-');
   const yearMatch = yearMonth.match(/\d{4}/);
   const currentYear = new Date().getFullYear();
   const currentMonth = new Date().getMonth() + 1;

   if (yearMatch) {
      const parsedYear = parseInt(yearMatch[0], 10);
      const parsedMonth = parseInt(month, 10);

      if (parsedYear > currentYear) {
         return true;
      } else if (parsedYear === currentYear && parsedMonth >= currentMonth) {
         return true;
      }
   }

   return false;
};

export const creditCardNumberRegExp = /^[0-9]{16}$/;

export const formatDate = (timestamp: string, time?: string, customFormat?: string): string => {
   const date = new Date(parseInt(timestamp));
   
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const day = String(date.getDate()).padStart(2, '0');
   const hours = String(date.getHours()).padStart(2, '0');
   const minutes = String(date.getMinutes()).padStart(2, '0');
 
   let formattedDate = customFormat
     ? customFormat
         .replace(/Y/g, String(year))
         .replace(/m/g, month)
         .replace(/d/g, day)
     : `${year}-${month}-${day}`;
 
   if (time) {
     formattedDate += ` ${time.split(' ')[0]}`;
   }
 
   return formattedDate;
}
 
 
