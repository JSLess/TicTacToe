
export { randomBigInt }


const
    Bits_Per_Digit = 3.322 ,
    Bits_Per_Byte = 8


/**
 *  Generates a random BigInt.
 */

function randomBigInt (
    digits : number
){

    const bits = Bits_Per_Digit * digits

    const bytes = Math.ceil( bits / Bits_Per_Byte )

    const ints = randomInts(bytes)

    const bigInt = intsToBigInt(ints)

    return clamp(bigInt,digits)
}


function clamp (
    value : bigint ,
    digits : number
){
    const clamped = value
        .toString()
        .slice(0,digits)

    return BigInt(clamped)
}


/**
 *  Combines multiple U8 into one BigInt
 */

function intsToBigInt (
    array : Uint8Array
){

    let bigint = 0n

    for ( const value of array ){
        bigint <<= 8n
        bigint += BigInt(value)
    }

    return bigint
}


/**
 *  Generates a Uint8Array with random values.
 */

function randomInts (
    length : number
){
    const array = new Uint8Array(length)

    crypto.getRandomValues(array)

    return array
}
