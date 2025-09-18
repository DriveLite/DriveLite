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

use anyhow::{Result, anyhow};
use std::fs;
use std::path::Path;

/// Example function: sync files from "source" to "destination"
pub fn run_sync() -> Result<String> {
    let source = Path::new("./sync_source");
    let destination = Path::new("./sync_dest");

    if !source.exists() {
        return Err(anyhow!(
            "Source directory '{}' does not exist",
            source.display()
        ));
    }

    if !destination.exists() {
        fs::create_dir_all(destination)?;
    }

    for entry in fs::read_dir(source)? {
        let entry = entry?;
        let file_name = entry.file_name();
        let dest_path = destination.join(file_name);
        fs::copy(entry.path(), dest_path)?;
    }

    Ok("Sync completed successfully.".to_string())
}
