export default function compare(a,b) {
    if (a === b)
        return true;

    // If they point to the same instance of date
    if (a instanceof Date && b instanceof Date)
        return a.getTime() === b.getTime();

    // If both of them are not null and their type is not an object
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
        return a === b;

    // This means the elements are objects
    // If they are not the same type of objects
    if (a.prototype !== b.prototype)
        return false;

    // Check if both of the objects have the same number of keys
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length)
        return false;

    // Check recursively for every key in both
    return keys.every(k => compare(a[k], b[k]));
}