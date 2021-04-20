
/**
 * Stemrobo Icon
 */
//% weight=280 color=#e6e600 icon="\uf192"
namespace Stemrobo {
    /**
     * Blink an led
     * @param x horizontal led
     * @param y vertical coordinate 
     * @param interval time in milli second between blink    
     */
    //% block="blink x $x y $y every $interval ms"
    //% weight=280 color=#ffb3e6 
    export function blink(x: number, y: number, interval:number): void {
        let sprite = game.createSprite(x,y)
        sprite.setBlink(interval)
        sprite.blink()
    }

   
}
