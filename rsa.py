import random

def generate_RSA_key_pair():
    p = generate_prime()
    q = generate_prime()

    n = p * q
    phi = (p - 1) * (q - 1)

    e = random.randint(2, phi - 1)
    while gcd(e, phi) != 1:
        e = random.randint(2, phi - 1)

    d = mod_inverse(e, phi)

    return {
        'public_key': (e, n),
        'private_key': (d, n)
    }

def encrypt_RSA(message, public_key):
    e, n = public_key
    encrypted_message = [pow(ord(char), e, n) for char in message]
    return encrypted_message

def decrypt_RSA(encrypted_message, private_key):
    d, n = private_key
    decrypted_message = ''.join([chr(pow(char, d, n)) for char in encrypted_message])
    return decrypted_message

def generate_prime():
    num = random.randint(10, 100)
    if num % 2 == 0:
        num += 1
    def is_prime(n):
        if n <= 1:
            return False
        if n <= 3:
            return True
        if n % 2 == 0 or n % 3 == 0:
            return False
        i = 5
        while i * i <= n:
            if n % i == 0 or n % (i + 2) == 0:
                return False
            i += 6
        return True
    while not is_prime(num):
        num += 2
    return num

def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

def mod_inverse(a, m):
    m0, x0, x1 = m, 0, 1
    while a > 1:
        q = a // m
        a, m = m, a % m
        x0, x1 = x1 - q * x0, x0
    return x1 + m0 if x1 < 0 else x1

key_pair = generate_RSA_key_pair()
public_key, private_key = key_pair["public_key"] , key_pair["private_key"]
message = "Hello world"
print("original message:", message)

encrypted_message = encrypt_RSA(message, public_key)
print("encrypted message:", encrypted_message)

decrypted_message = decrypt_RSA(encrypted_message, private_key)
print("decrypted message:", decrypted_message)
