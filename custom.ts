
/**
 * Stemrobo Icon
 */
//% weight=80 color=#0fbc11 icon=""
namespace Stemrobo {
    /**
     * Blink an led
     * @param x horzontal led
     * @param y vertical coordinate 
     * @param interval time in milli second between blink     */
    //% block
    export function blink(x:number,y:number,interval:number): void {
        let sprite = game.createSprite(x,y)
        sprite.setBlink(interval)
        sprite.blink()
    }

   
}
