import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectToCsvService {

  constructor() { }
  
  
    convert(objectArray:Array<any>)
    {
    
    
      let csvFile = "";
      let csvHeader = "data:text/csv;charset=utf-8,";
      let csvContent = "";

      var esPrimeraFila = true;
      objectArray.forEach( object => {

          Object.keys(object).forEach(e => {
            
            if( this.isObjectAndNotNull(object[e])   )
            {
              var newObject = object[e]

                Object.keys(newObject).forEach(subObject => 
                { 
                  if( this.isObjectAndNotNull(newObject[subObject])   )
                  {
                    let newObject2 = newObject[subObject]
        
                      Object.keys(newObject2).forEach(subObject => 
                      { 
                          if(esPrimeraFila)
                            csvHeader += subObject + ",";
                          
                          csvContent += newObject2[subObject] + ",";
                      })
                  }
                  else
                  {
                    if(esPrimeraFila)
                      csvHeader += subObject + ",";
                    
                    csvContent += newObject[subObject] + ",";
                  }
                })
            }
            else
            {
              if(esPrimeraFila)
                csvHeader += e + "," ;  
              csvContent += object[e] + ",";
            }
          }
          
          );
          esPrimeraFila = false;
            csvContent +=  "\r\n";
          
        
      });

      csvFile += csvHeader + "\r\n" + csvContent ;

      var encodedUri = encodeURI(csvFile);
      window.open(encodedUri);
  }


    isObjectAndNotNull(object)
    {
          if( object != null && typeof object === 'object'  )
        return true;
      else
        return false;

    }


  }




