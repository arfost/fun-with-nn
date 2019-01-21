export function alea(min, max) {
    if (typeof max === 'undefined') {
        max = min;
        min = 1;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

export function returnNewAleaSkin() {
    return [
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1]
    ]
}