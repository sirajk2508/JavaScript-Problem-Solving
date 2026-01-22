/*
Implement infinite currying
You are expected to design a function that keeps returning another function until no
argument is passed. This tests your understanding of closures, function chaining, and
how values are preserved across calls.
sum(1)(2)(3)...() // 6
*/

/**
SIMPLE EXPLANATION:
- We want to create a function that:
- Keeps accepting numbers one by one
- Adds them together
- Stops only when we call it without any argument
- Then returns the final sum

We use a closure to store the total, return the same function again and again, and stop only when no argument is passed.
 */

const sum = function(a) {
    if(arguments.length === 0)
        return () => 0;

    let total = a;

    const inner = function(b) {
        if(arguments.length == 0)
            return total;
        total += b;
        return inner;
    }

    return inner;
}

console.log(sum(23)(45)(67)(89)(77)(61)(12)());
console.log(sum()());
console.log(sum(0)());
console.log(sum(1)(4)(0)());