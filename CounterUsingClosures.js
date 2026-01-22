/*
2. Create a **counter using closures** with increment, decrement, and reset.
*Tests your ability to create private state without classes and avoid global variables.*
    
    `// example
    const counter = createCounter(5);`
    
    `console.log(counter.increment()); // 6
    console.log(counter.increment()); // 7
    console.log(counter.decrement()); // 6
    console.log(counter.reset());  // 5`
*/

const createCounter = (count) => {
    let prevCount = count;
    return {
        increment: () => ++prevCount,
        decrement: () => --prevCount,
        reset: () => prevCount = count
    }
}

const counter = createCounter(5);

console.log(counter.increment()); // 6
console.log(counter.increment()); // 7
console.log(counter.decrement()); // 6
console.log(counter.reset());  // 5