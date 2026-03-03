export function timer(fn) {
    let start = new Date();

    fn();

    let end = new Date();
    let timeSpent = end - start;
}
