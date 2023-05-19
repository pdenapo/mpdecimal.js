import { dlopen, FFIType, suffix,ptr} from "bun:ffi";

const path = `libmpdec.${suffix}`;

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
  }
});

const precision= 10
export const mpdecimal= libmpdec.symbols
