import { SearchParams, UserSearch } from "@/app/(client-components)/type";

export function encodeIntoQuery(state: SearchParams): string {
   const queryParams = new URLSearchParams();
 
   if (state.chauffer) {
      const { type, pickUp, destination, hours, startDate, startTime } = state.chauffer;
   
      queryParams.append("drive", 'chauffer');
      queryParams.append("type", type);
      queryParams.append("pick-up", pickUp ? pickUp.name : "");
      queryParams.append("pick-up-id", pickUp ? pickUp.id.toString() : "");

      if (destination) {
         queryParams.append("destination", destination.name);
         queryParams.append("destination-id", destination.id.toString());
      }else if (hours !== null && hours !== undefined) {
         queryParams.append("hours", String(hours));
      }

      if (startDate !== null) {
         queryParams.append("start-date", String(startDate));
      }
      
      if (startTime !== null) {
         queryParams.append("start-time", startTime);
      }
   }else if(state.rental){
      const { type, pickUp, dropOff, startDate, endDate, startTime, endTime } = state.rental;
   
      queryParams.append("drive", 'rental');
      queryParams.append("type", type);
      queryParams.append("pick-up", pickUp ? pickUp.name : "");
      queryParams.append("pick-up-id", pickUp ? pickUp.id.toString() : "");

      if(type === 'different-destination'){
         queryParams.append("drop-off", dropOff ? dropOff.name : "");
         queryParams.append("drop-off-id", dropOff ? dropOff.id.toString() : "");
      }
      
      if (startDate !== null) {
         queryParams.append("start-date", String(startDate));
      }
      if (endDate !== null) {
         queryParams.append("end-date", String(endDate));
      }
      if (startTime !== null) {
         queryParams.append("start-time", startTime);
      }
      if (endTime !== null) {
         queryParams.append("end-time", endTime);
      }
   }
 
   return queryParams.toString();
}

export function decodeFromQuery(queryString: string): UserSearch | string {

   let state : UserSearch;

   const params = queryString.split('&').reduce((paramsObject:any, param) => {

      const [key, value] = param.split('=');
      paramsObject[key] = decodeURIComponent(value).replaceAll("+", " ");
      return paramsObject;
   }, {});

   if(!('drive' in params)){

      return 'search error';
   }else if(params['drive'] == 'chauffer'){

      if(!('type' in params) || (!('pick-up' in params) || !('pick-up-id' in params)) || ((!('destination' in params) || !('destination-id' in params)) && !('hours' in params)) || !('start-date' in params) || !('start-time' in params)) {

         return 'chauffer search error';
      }
   }else if(params['drive'] == 'rental'){

      if(!('type' in params) || !('pick-up' in params) || ((params['type'] == 'different-destination') && !('drop-off' in params)) || !('start-date' in params) || !('start-time' in params) || !('end-date' in params) || !('end-time' in params)) {

         return 'rental search error';
      }
   }

   if(params['drive'] == 'chauffer'){

      state = {
         type: 'chauffer',
         chauffer: {
            type: params['type'],
            pickUp: {id: params['pick-up-id'], name: params['pick-up']},
            destination: ('destination' in params) ? {id: params['destination-id'], name: params['destination']} : null,
            hours: ('hours' in params) ? params['hours'] : null,
            startDate: params['start-date'],
            startTime: params['start-time']
         }
      }
   }else if(params['drive'] == 'rental'){

      state = {
         type: 'rental',
         rental: {
            type: params['type'],
            pickUp: {id: params['pick-up-id'], name: params['pick-up']},
            dropOff: ('drop-off' in params) ? {id: params['drop-off-id'], name: params['drop-off']} : null,
            startDate: params['start-date'],
            startTime: params['start-time'],
            endDate: params['end-date'],
            endTime: params['end-time']
         }
      }
   }else{

      return 'invalid query params';
   }

   return state;
}
 