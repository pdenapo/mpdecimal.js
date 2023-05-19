import { dlopen, FFIType, suffix,ptr} from "bun:ffi";

const path = `libmpdec.${suffix}`;;

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
  }
});

const precision= 10
const mpdecimal= libmpdecimal.symbols

// Creates a pointer
const decimal_ctx = new BigUint64Array(1)
console.log("Using libmpdec version "+mpdecimal.mpd_version())
mpdecimal.mpd_init(decimal_ctx, precision);

let my_decimal= mpdecimal.mpd_new(decimal_ctx)
const str = Buffer.from("10", "utf8");
mpdecimal.mpd_set_string(my_decimal, ptr(str), decimal_ctx);
mpdecimal.mpd_print(my_decimal)