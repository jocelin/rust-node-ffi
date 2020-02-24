#[no_mangle]
pub extern "C" fn fibonacci(n: i32) -> i32 {
    return match n {
        0 => 0,
        1 => 1,
        n => fibonacci(n - 1) + fibonacci(n - 2),
    };
}
