function generateRSAKeyPair() {
    const p = generatePrime();
    const q = generatePrime();

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    let e;
    do {
        e = Math.floor(Math.random() * (phi - 2)) + 2;
    } while (gcd(e, phi) !== 1);

    const d = modInverse(e, phi);

    return {
        publicKey: { e, n },
        privateKey: { d, n }
    };
}

function encryptRSA(message, publicKey) {
    const { e, n } = publicKey;
    const encryptedMessage = message.split('').map(char => {
        const charCode = char.charCodeAt(0);
        return BigInt(charCode) ** BigInt(e) % BigInt(n);
    });
    return encryptedMessage;
}

function decryptRSA(encryptedMessage, privateKey) {
    const { d, n } = privateKey;
    const decryptedMessage = encryptedMessage.map(charCode => {
        const decryptedCharCode = BigInt(charCode) ** BigInt(d) % BigInt(n);
        return String.fromCharCode(Number(decryptedCharCode));
    });
    return decryptedMessage.join('');
}

function generatePrime() {
    let num = Math.floor(Math.random() * 100) + 10;
    if (num % 2 === 0) {
        num++;
    }
    function isPrime(n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        for (let i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
    }
    while (!isPrime(num)) {
        num += 2;
    }
    return num;
}


function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

function modInverse(a, m) {
    let [m0, x0, x1] = [m, 0, 1];
    while (a > 1) {
        const q = Math.floor(a / m);
        [a, m] = [m, a % m];
        [x0, x1] = [x1 - q * x0, x0];
    }
    return (x1 < 0) ? x1 + m0 : x1;
}

const { publicKey, privateKey } = generateRSAKeyPair();
const message = "the world is nothing but a stage";
console.log("original message:", message);

const encryptedMessage = encryptRSA(message, publicKey);
console.log("encrypted message:", encryptedMessage);

const decryptedMessage = decryptRSA(encryptedMessage, privateKey);
console.log("decrypted message:", decryptedMessage);
