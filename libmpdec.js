import { dlopen, FFIType, suffix,ptr} from "bun:ffi";

const path = `libmpdec.${suffix}`;

const path_libc= "libc.so.6"

const libc = dlopen(path_libc, {
  free:{
    args:[FFIType.ptr]
  }
})

const libmpdec = dlopen(path, {
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
  },
  mpd_sub:{
    args: [FFIType.ptr,FFIType.ptr,FFIType.ptr,FFIType.ptr]
  },
  mpd_mul:{
    args: [FFIType.ptr,FFIType.ptr,FFIType.ptr,FFIType.ptr]
  },
  mpd_div:{
    args: [FFIType.ptr,FFIType.ptr,FFIType.ptr,FFIType.ptr]
  }, 
  mpd_to_eng:{
    args: [FFIType.ptr,FFIType.int],
    returns: FFIType.ptr    
  }, // engineering string representation of a decimal
  mpd_del:{
    args: [FFIType.ptr]
  }
 // frees all storage allocated for a decimal
});

const precision= 10
export const mpdecimal= libmpdec.symbols
export const std_lib = libc.symbols

