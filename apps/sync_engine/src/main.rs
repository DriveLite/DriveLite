use sync_engine::sync::run_sync;

#[tokio::main]
async fn main() {
    println!("DriveLite Sync Engine started...");

    match run_sync() {
        Ok(msg) => println!("{}", msg),
        Err(e) => eprintln!("Error during sync: {}", e),
    }
}
