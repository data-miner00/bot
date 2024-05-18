// Declare an array buffer
const rawArray = new ArrayBuffer(10);

// Use the array buffer for specific type of data
const uint8Array = new Uint8Array(rawArray);

// Changing data like in C
uint8Array[0] = 12;

/* ArrayBuffer {
 *  [Uint8Contents]: <0c 00 00 00 00 00 00 00 00 00>,
 *  byteLength: 10
 * }
 */

uint8Array[1] = 24;

/* ArrayBuffer {
 *  [Uint8Contents]: <0c 18 00 00 00 00 00 00 00 00>,
 *  byteLength: 10
 * }
 */

// Using it for uint16
const uint16Array = new Uint16Array(rawArray);

uint16Array[2] = 0x1234;

/* ArrayBuffer {
 *  [Uint8Contents]: <0c 18 00 00 34 12 00 00 00 00>,
 *  byteLength: 10
 * }
 */
