function fibonacci(max) {
    var fib = []; 

    fib[0] = 0;
    fib[1] = 1;

    for (var i = 2; i <= max; i++) {
        fib[i] = fib[i - 2] + fib[i - 1];
    }

    return fib;
}
