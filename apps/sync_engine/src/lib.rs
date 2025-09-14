pub mod sync;

use std::ffi::CString;
use std::os::raw::c_char;

/// Example FFI function callable from Flutter or other languages
#[unsafe(no_mangle)]
pub extern "C" fn hello_from_rust() -> *const c_char {
    let s = CString::new("Hello from Rust Sync Engine!").unwrap();
    s.into_raw()
}

/// Call a sync function via FFI
#[unsafe(no_mangle)]
pub extern "C" fn sync_files() -> *const c_char {
    match sync::run_sync() {
        Ok(msg) => CString::new(msg).unwrap().into_raw(),
        Err(e) => CString::new(format!("Error: {}", e)).unwrap().into_raw(),
    }
}
