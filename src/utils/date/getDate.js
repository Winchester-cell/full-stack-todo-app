export function getDate(input) {
    const datePart = input.split('T')[0];
    return datePart.replace(/-/g, '/');
}

export function getTime(input) {
    const timePart = input.split('T')[1]; // "14:17:29.405+00:00"
    const [hour, minute] = timePart.split(':'); // ["14", "17", ...]
    return `${hour}:${minute}`;
}

