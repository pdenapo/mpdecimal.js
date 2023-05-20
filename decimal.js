import {mpdecimal,std_lib} from "mpdecimal.js";
import { CString} from "bun:ffi";


let decimal_ctx
let debug_memory=false

export function set_debug_memory(v)
{
  debug_memory = v
}

export function decimal_init(precision) 
{
  decimal_ctx = new BigUint64Array(1)
  console.log("Using libmpdec version "+mpdecimal.mpd_version())
  mpdecimal.mpd_init(decimal_ctx, precision);  
}

// TODO: como reemplazamos los destructores en Javascript?

const registerFinalizer = new FinalizationRegistry((value) => {
  if (debug_memory)
  { 
   console.log("decimal finalizer called")
   process.stdout.write("value=")
   mpdecimal.mpd_print(value)
  }
  mpdecimal.mpd_del(value)
 });

 const registerFinalizer_free = new FinalizationRegistry((pointer) => {
  if (debug_memory)
  { 
   console.log("decimal finalizer_free called")
   console.log("pointer=",pointer)
  }
  std_lib.free(pointer)
 });

 function new_value(object)
 {
   let value= mpdecimal.mpd_new(decimal_ctx)
   registerFinalizer.register(object, value)
   return value
 }


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
        this.value= new_value(this)
        let data_buffer = new TextEncoder().encode(data + "\0");
        mpdecimal.mpd_set_string(this.value, data_buffer, decimal_ctx);
      }
      else 
      {
         throw "Invalid call to Decimal constructor! with data of type "+type 
         console.log(data)
      }     
    }
    print()
    {
      if (this.value !== undefined)
          mpdecimal.mpd_print(this.value)
      else
        process.stdout.write("undefined")
    }
    add(y)
    {
      let result_object= new Decimal()
      if ((this.value !== undefined) &&(y.value !== undefined))
      {
        let result= new_value(result_object)
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
        let result= new_value(result_object)
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
        let result= new_value(result_object)
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
        const result= new_value(result_object)
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
        if (debug_memory)
          console.log("result=",result);
        const result_string = new CString(result);
        registerFinalizer_free.register(result_string,result)
        return result_string.toString()
      }
      else 
        return "undefined"
    }
}





