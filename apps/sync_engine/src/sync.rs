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
