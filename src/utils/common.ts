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