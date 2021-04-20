
/**
 * Stemrobo Icon
 */
//% weight=280 color=#0fbc11 icon=""
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

   
}
