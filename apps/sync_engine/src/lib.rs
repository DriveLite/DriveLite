// DriveLite - The self-hostable file storage solution.
// Copyright (C) 2025
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
