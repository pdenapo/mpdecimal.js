import { dlopen, FFIType, suffix,ptr} from "bun:ffi";

const path = `libmpdec.${suffix}`;

const libmpdecimal = dlopen(path, {
    // Library version
    mpd_version: {
    args: [],
    returns: FFIType.cstring,
  },
  mpd_init: {
    args: [FFIType.ptr,FFIType.u64],
  },
  mpd_new:{
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },
  mpd_set_string:  {
    args:[FFIType.ptr,FFIType.cstring,FFIType.ptr]
  },
  mpd_print:{
    args: [FFIType.ptr]
  },
  mpd_add:{
    args: [FFIType.ptr,FFIType.ptr,FFIType.ptr,FFIType.ptr]
  }
});

const precision= 10
const mpdecimal= libmpdecimal.symbols

// Creates a pointer
const decimal_ctx = new BigUint64Array(1)
console.log("Using libmpdec version "+mpdecimal.mpd_version())
mpdecimal.mpd_init(decimal_ctx, precision);

let my_decimal1= mpdecimal.mpd_new(decimal_ctx)
let arr1 = new TextEncoder().encode("10" + "\0");
mpdecimal.mpd_set_string(my_decimal1, arr1, decimal_ctx);
mpdecimal.mpd_print(my_decimal1)

let my_decimal2= mpdecimal.mpd_new(decimal_ctx)
let arr2 = new TextEncoder().encode("2.5" + "\0");
mpdecimal.mpd_set_string(my_decimal2, arr2, decimal_ctx);
mpdecimal.mpd_print(my_decimal2)

let my_decimal3= mpdecimal.mpd_new(decimal_ctx)
mpdecimal.mpd_add(my_decimal3,my_decimal1,my_decimal2,decimal_ctx)
mpdecimal.mpd_print(my_decimal3)