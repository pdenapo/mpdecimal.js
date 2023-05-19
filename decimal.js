import {mpdecimal} from "mpdecimal.js";

let decimal_ctx

export function decimal_init(precision) 
{
  decimal_ctx = new BigUint64Array(1)
  console.log("Using libmpdec version "+mpdecimal.mpd_version())
  mpdecimal.mpd_init(decimal_ctx, precision);  
}

export class Decimal{
    value;
    constructor(s)
    {
      if (s===undefined) // parameter was omitted in call
        return;
      if (typeof(s)==='string')
      {
        this.value= mpdecimal.mpd_new(decimal_ctx)
        let s_buffer = new TextEncoder().encode(s + "\0");
        mpdecimal.mpd_set_string(this.value, s_buffer, decimal_ctx);
      }
      else 
         throw "Invalid call to Decimal constructor!"     
    }
    print()
    {
      mpdecimal.mpd_print(this.value)
    }
    add(y)
    {
     let result= mpdecimal.mpd_new(decimal_ctx)
     mpdecimal.mpd_add(result,this.value,y.value,decimal_ctx)
     let result_object= new Decimal()
     result_object.value= result
     return result_object   
    }
    sub(y)
    {
     let result= mpdecimal.mpd_new(decimal_ctx)
     mpdecimal.mpd_sub(result,this.value,y.value,decimal_ctx)
     let result_object= new Decimal()
     result_object.value= result
     return result_object   
    }
    mul(y)
    {
     let result= mpdecimal.mpd_new(decimal_ctx)
     mpdecimal.mpd_mul(result,this.value,y.value,decimal_ctx)
     let result_object= new Decimal()
     result_object.value= result
     return result_object   
    }
    div(y)
    {
     let result= mpdecimal.mpd_new(decimal_ctx)
     mpdecimal.mpd_div(result,this.value,y.value,decimal_ctx)
     let result_object= new Decimal()
     result_object.value= result
     return result_object   
    }
}





