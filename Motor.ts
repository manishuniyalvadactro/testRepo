// Add your code here

/**
*
*/

let outputABuffer = 0;
let outputBBuffer = 0;

enum PIN {                     // pins
    //% block=Sv5
    Sv5 = 0,               //
    //% block=Sv6
    Sv6 = 1,                //
}

enum ADDRESS {                     // address for MCP23017 (configurable by tying pins 15,16,17 on the mcp23017 high or low)
    //% block=0x20
    A20 = 0x20,               //
    //% block=0x21
    A21 = 0x21,                //
    //% block=0x22
    A22 = 0x22,                //
    //% block=0x23
    A23 = 0x23,                //
    //% block=0x24
    A24 = 0x24,                //
    //% block=0x25
    A25 = 0x25,                //
    //% block=0x26
    A26 = 0x26,                //
    //% block=0x27
    A27 = 0x27                //
}

let myMCP23017Address = ADDRESS.A20

enum SET_PORT {
    //% block=PORT_A
    A = 0,
    //% block=PORT_B
    B = 256
}

enum REG_PIO {
    //% block=PORT_A
    A = 4608,
    //% block=PORT_B
    B = 4864
}

// custom enum for moveIt function
enum MOVE {
    //% block="FORWARD"
    forward = 0,
    //% block="BACKWARD"
    backward = 1,
    //% block="LEFT"
    left = 2,
    //% block="RIGHT"
    right = 3,
    //% block="STOP"
    stop = 4,
}


/**
* Custom blocks
*/
//% weight=100 color=blue icon="\uf1b9"
namespace STEMROBO {

    export function setPortAsOutput(port: SET_PORT) {
        pins.i2cWriteNumber(myMCP23017Address, port + 0x00, NumberFormat.UInt16BE)
    }

    export function setupSimplePulsingOnAddress(address: ADDRESS) {
        myMCP23017Address = address
        setPortAsOutput(SET_PORT.A)
        setPortAsOutput(SET_PORT.B)
    }

    export function setOutputA(bit: number) {
        outputABuffer = outputABuffer | (1 << bit)
    }

    export function clearOutputA(bit: number) {
        let tempMask = 1 << bit
        tempMask = tempMask ^ 0B11111111
        outputABuffer = outputABuffer & tempMask
    }

    export function writeNumberToPort(port: REG_PIO, value: number) {
        pins.i2cWriteNumber(myMCP23017Address, port + value, NumberFormat.UInt16BE)
    }

    export function updateOutputA() {
        writeNumberToPort(4608, outputABuffer)
    }

    //% block="start motor"
    export function setup(): void {
        setupSimplePulsingOnAddress(ADDRESS.A20);
        setPortAsOutput(SET_PORT.A);
    }
   
    //% block="move $dir"
    export function moveIt(dir: MOVE): void {
        if (dir == 0) {
            setOutputA(4)
            setOutputA(5)
            setOutputA(0)
            clearOutputA(1)
            clearOutputA(2)
            setOutputA(3)
            updateOutputA()
        }
        else if (dir == 1) {
            setOutputA(4)
            setOutputA(5)
            setOutputA(1)
            clearOutputA(0)
            clearOutputA(3)
            setOutputA(2)
            updateOutputA()
        }
        else if (dir == 2) {
            setOutputA(4)
            setOutputA(5)
            setOutputA(0)
            clearOutputA(1)
            clearOutputA(3)
            setOutputA(2)
            updateOutputA()
        }
        else if (dir == 3) {
            setOutputA(4)
            setOutputA(5)
            setOutputA(1)
            clearOutputA(0)
            clearOutputA(2)
            setOutputA(3)
            updateOutputA()
        }
        else {
            clearOutputA(0)
            clearOutputA(1)
            clearOutputA(2)
            clearOutputA(3)
            clearOutputA(4)
            clearOutputA(5)
            updateOutputA()
        }
    }
    
    //% block="digital read $pin"
    export function digitalRead(pin: PIN): number {
        pins.i2cWriteNumber(32,
            19,
            NumberFormat.Int8BE,
            false
        )
        if (pin == 0) {
            return pins.i2cReadNumber(32, NumberFormat.Int8LE, false);
        }
        else {
            if (pins.i2cReadNumber(32, NumberFormat.Int8LE, false) == 2) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
}

