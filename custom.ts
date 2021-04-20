enum PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
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
    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
   
    //% blockId=sonar_ping block="Read sonar in unit %unit"
    export function ping(unit: PingUnit, maxCmDistance = 500): number
        {
            // send pulse
            pins.setPull(4, PinPullMode.PullNone);
            pins.digitalWritePin(2, 0);
            control.waitMicros(2);
            pins.digitalWritePin(2, 1);
            control.waitMicros(10);
            pins.digitalWritePin(2, 0);

            // read pulse
            const d = pins.pulseIn(1, PulseValue.High, maxCmDistance * 58);

            switch (unit)
            {
                case PingUnit.Centimeters: return Math.idiv(d, 58);
                case PingUnit.Inches: return Math.idiv(d, 148);
                default: return d ;
            }
        }
            
   
}
