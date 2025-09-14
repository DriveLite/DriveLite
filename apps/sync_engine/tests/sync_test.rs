use sync_engine::sync::run_sync;

#[test]
fn test_sync_files() {
    let result = run_sync();
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "Sync completed successfully.".to_string());
}
