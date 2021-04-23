enum PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}
enum IRSensor
{
    //% block="left"
    Left,
    //% block="right"
    Right
}
enum StemBuzzer
{
    //% block="on"
    On,
    //% block="off"
    Off
}
enum StemMotor
{
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="forward"
    Forward, 
    //% block="backward"
    Backward,
    //% block="stop"
    Stop

}

/**
 * Stemrobo Icon
 */
//% weight=280 color=#e6e600 icon="\uf1b9"
namespace Stemrobo {
    /**
     * Blink an led
     * @param x horizontal led
     * @param y vertical coordinate 
     * @param interval time in milli second between blink    
     */
    //% block="blink x $x y $y every $interval ms"
    
    export function blink(x: number, y: number, interval:number): void {
        let sprite = game.createSprite(x,y)
        sprite.setBlink(interval)
        sprite.blink()
    }
    //% block="Read sonar in unit %unit"
    export function ping(unit: PingUnit, maxCmDistance = 500): number
        {
            let trigger = DigitalPin.P1;
            let pecho = DigitalPin.P0;
            pins.setPull(trigger, PinPullMode.PullNone);
            pins.digitalWritePin(trigger, 0);
            control.waitMicros(2);
            pins.digitalWritePin(trigger, 1);
            control.waitMicros(10);
            pins.digitalWritePin(trigger, 0);

            // read pulse
            const d = pins.pulseIn(pecho, PulseValue.High, maxCmDistance * 58);

            switch (unit)
            {
                case PingUnit.Centimeters: return Math.idiv(d, 58);
                case PingUnit.Inches: return Math.idiv(d, 148);
                default: return d ;
            }
        }
        //% block="%sensor|line sensor"
    export function readLine(sensor: IRSensor): number
    {
        if (sensor == IRSensor.Left)
            return pins.digitalReadPin(DigitalPin.P14);
        else
            return pins.digitalReadPin(DigitalPin.P13);
    } 
    //% block="switch buzzer%flag"
    //% flag.shadow="toggleOnOff"
    export function stembuzzer(flag: boolean): void
    {
        let buzz = flag ? 1 : 0;
        pins.digitalWritePin(DigitalPin.P15, buzz);
    }
    //% block="light sensor"
    export function readLight(): number
    {
        return pins.digitalReadPin(DigitalPin.P16);
    }
    //% block="Turn Motor%turn"
     export function motor(turn: StemMotor): void
    {
        let leftMotor1 = DigitalPin.P20;
        let leftMotor2 = DigitalPin.P19;
        let rightMotor1 = DigitalPin.P12;
        let rightMotor2 = DigitalPin.P8;
        if (turn == StemMotor.Right)
        {
            pins.digitalWritePin(leftMotor1, 0);
            pins.digitalWritePin(leftMotor2, 1);
            pins.digitalWritePin(rightMotor1, 1);
            pins.digitalWritePin(rightMotor2, 0);
        }
        else if (turn == StemMotor.Left)
        {
            pins.digitalWritePin(leftMotor1, 1);
            pins.digitalWritePin(leftMotor2, 0);
            pins.digitalWritePin(rightMotor1, 0);
            pins.digitalWritePin(rightMotor2, 1);
        }
        else if (turn == StemMotor.Forward)
        {
            pins.digitalWritePin(leftMotor1, 1);
            pins.digitalWritePin(leftMotor2, 0);
            pins.digitalWritePin(rightMotor1, 1);
            pins.digitalWritePin(rightMotor2, 0);
        }
        else if (turn == StemMotor.Backward)
        {
            pins.digitalWritePin(leftMotor1, 0);
            pins.digitalWritePin(leftMotor2, 1);
            pins.digitalWritePin(rightMotor1, 0);
            pins.digitalWritePin(rightMotor2, 1);
        }
        else
        {
            pins.digitalWritePin(leftMotor1, 0);
            pins.digitalWritePin(leftMotor2, 0);
            pins.digitalWritePin(rightMotor1, 0);
            pins.digitalWritePin(rightMotor2, 0);
        }
    } 
}
