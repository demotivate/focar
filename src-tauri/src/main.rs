// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    let devtools_plugin = devtools::init();

    tauri::Builder::default()
        .plugin(devtools_plugin)
        .setup(|_| {
            // It is compatible with the `tracing` ecosystem!
            tracing::info!("Hello World!");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
