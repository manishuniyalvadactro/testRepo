
/**
 * Stemrobo Icon
 */
//% weight=280 color=#ffff00 icon="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.stemrobo.com%2Fcareers%2Fstem-innovation-engineer%2F&psig=AOvVaw1Y0Qhzfma7zXJ7z6MEZkwf&ust=1618985565870000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiN8K6VjPACFQAAAAAdAAAAABAD"
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
