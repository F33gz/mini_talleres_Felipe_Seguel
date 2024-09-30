//https://www.codewars.com/kata/52f787eb172a8b4ae1000a34//
function zeros (n) {
    let iterador = 1;
    let result = 0;
    while (true) {
        if (Math.pow(5, iterador) > n) {
            break;
        }
        result += Math.floor(n / Math.pow(5, iterador));
        iterador++;
    }
    return result;
}