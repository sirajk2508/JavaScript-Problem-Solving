/*
3. Implement a **once() function** that runs only the first time.
Common utility problem that checks closure usage and side-effect control.
`//example`
    
    `const init = once(() => {
    console.log("Initialized");
    return 42;
    });`
    
    `init(); // "Initialized"
    init(); // nothing
    init(); // nothing`
*/

/*
INTUITION:
The goal of a once function is to ensure a function runs only one time, no matter how many times it’s called later.
This is useful when we want to prevent duplicate actions, like submitting a form twice or initializing something only once.
The key idea is to remember whether the function has already been called and the best way to remember state in
JavaScript is using a closure.


I’d solve this by wrapping the target function inside another function that tracks whether it has already been executed.
I’ll store a flag like called in a closure so it persists across calls without using global variables.
If the function was already called, I’ll skip executing it again.”
*/

const once = (fn) => {
    let called = false;
    return function(...args) {
        if(called) {
            console.log("Already called once");
            return;
        }
        called = true;
        return fn(...args);
    }
}

const init = once((name) => console.log("Hi " + name));
init("Siraj");
init("Rohan");


/**
 * RETURN CACHED VALUE
 */

const cachedOnce = (fn) => {
    let called = false;
    let result;
    return function(...args) {
        if(!called) {
            called = true;
            result = fn(...args);
        }
        return result; // returns cached value from first call
    }
}

const greetOnce = cachedOnce((name) => "Hello " + name);
console.log(greetOnce("John"))
console.log(greetOnce("Smith"));