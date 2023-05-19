import {mpdecimal} from "mpdecimal.js";
import { CString} from "bun:ffi";


let decimal_ctx

export function decimal_init(precision) 
{
  decimal_ctx = new BigUint64Array(1)
  console.log("Using libmpdec version "+mpdecimal.mpd_version())
  mpdecimal.mpd_init(decimal_ctx, precision);  
}

// TODO: como reemplazamos los destructores en Javascript?

// const decimal_finalization_registry = new FinalizationRegistry((value) => {
//   console.log("decimal_finalization_registry called")
//   console.log("value=",value)
//   mpdecimal.mpd_new(value)
// });


export class Decimal{
    value;
    constructor(data)
    {
      if (data===undefined) // parameter was omitted in call
      {
        this.value=undefined;
        return;
      }
      let type = typeof(data) 
      if (type==='string' ||  type==='number')
      {
        this.value= mpdecimal.mpd_new(decimal_ctx)
        let data_buffer = new TextEncoder().encode(data + "\0");
        mpdecimal.mpd_set_string(this.value, data_buffer, decimal_ctx);
      }
      else 
      {
         throw "Invalid call to Decimal constructor! with data of type "+type 
         console.log(data)
      }     
    }
    destructor()
    {
     
    }
    print()
    {
      if (this.value !== undefined)
          mpdecimal.mpd_print(this.value)
      else
        process.stdout("undefined")
    }
    add(y)
    {
      let result_object= new Decimal()
      if ((this.value !== undefined) &&(y.value !== undefined))
      {
        let result= mpdecimal.mpd_new(decimal_ctx)
        mpdecimal.mpd_add(result,this.value,y.value,decimal_ctx)        
        result_object.value= result
        
      }
      return result_object
    }
    sub(y)
    {
      let result_object= new Decimal()
      if ((this.value !== undefined) &&(y.value !== undefined))
      {
        let result= mpdecimal.mpd_new(decimal_ctx)
        mpdecimal.mpd_sub(result,this.value,y.value,decimal_ctx)
        result_object.value= result
      }
     return result_object   
    }
    mul(y)
    {
      let result_object= new Decimal()
      if ((this.value !== undefined) &&(y.value !== undefined))
      {
        let result= mpdecimal.mpd_new(decimal_ctx)
        mpdecimal.mpd_mul(result,this.value,y.value,decimal_ctx)
        result_object.value= result
      }
      return result_object   
    }
    div(y)
    {
      let result_object= new Decimal()
      if ((this.value !== undefined) &&(y.value !== undefined))
      {
        const result= mpdecimal.mpd_new(decimal_ctx)
        mpdecimal.mpd_div(result,this.value,y.value,decimal_ctx)
        result_object.value= result
      }
     return result_object   
    }
    toString()
    {
      if (this.value !== undefined)
      {
        const result= mpdecimal.mpd_to_eng(this.value, 0);  // 0 = exponential in lower case
        const result_string = new CString(result);
        return result_string.toString()
      }
      else 
        return "undefined"
    }
}





