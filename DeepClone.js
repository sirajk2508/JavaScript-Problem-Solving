/**
Write a deep copy polyfill
You must clone nested objects without sharing references. Interviewers look for correct handling of arrays, special objects, and circular references.
 */

const deepCopy = (original, visited = new Map()) => {
    if(typeof original !== "object" || original === null) {
        return original;
    }

    if(visited.has(original)) {
        return visited.get(original);
    }

    let copy;

    if(Array.isArray(original)) {
        copy = [];
    } else if(original instanceof Date) {
        copy = new Date(original);
    } else if(original instanceof RegExp) {
        copy = new RegExp(original.source, original.flags);
    } else if(original instanceof Map) {
        copy = new Map();
    } else if(original instanceof Set) {
        copy = new Set();
    } else {
        copy = {};
    }

    visited.set(original, copy);

    if(original instanceof Map) {
        original.forEach((value, key) => {
            copy.set(deepCopy(key, visited), deepCopy(value, visited));
        });
        return copy;
    }

    if(original instanceof Set) {
        original.forEach((value) => {
            copy.add(deepCopy(value, visited));
        });
        return copy;
    }

    for(let key in original) {
        if(Object.prototype.hasOwnProperty.call(original, key)) {
            copy[key] = deepCopy(original[key]);
        }
    }
    return copy;
}

function greet(name) {
    return `Hello, ${name}`;
}

const sharedAddress = {
    city: "Los Angeles",
    zip: 90001
};

const complexObject = {
    name: "James Cameron",
    createdAt: new Date("2020-01-01"),
    pattern: /terminator\d+/gi,
    greetFn: greet,

    movies: ["T1", "T2", { title: "Avatar", year: 2009 }],

    address: sharedAddress,

    meta: {
        active: true,
        ratings: new Set([8.5, 9.0, 9.5]),
    },

    studioMap: new Map([
        ["Terminator 2", { studio: "Carolco", year: 1991 }],
        ["Avatar", { studio: "Fox", year: 2009 }]
    ])
};

// Circular references
complexObject.self = complexObject;
complexObject.meta.parent = complexObject;

// Shared reference reused
complexObject.backupAddress = sharedAddress;

// Circular inside Map value
complexObject.studioMap.get("Avatar").owner = complexObject;

console.log(complexObject.name); // "James Cameron"
console.log(complexObject.address.city); // "Los Angeles"
console.log(complexObject.movies[2].title); // "Avatar"
console.log(complexObject.meta.ratings.has(10)); // false
console.log(
  complexObject.studioMap.get("Avatar").studio
); // "Fox"

