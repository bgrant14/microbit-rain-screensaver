let asleep = true, scrSel = 0

/*
 *  Rain Screensaver:
 */

// Nodes for linked list
class dropNode {
    dropX: number
    dropY: number
    dropB: number
    nextDrop: dropNode
    constructor() {
        //Create new sprite at random led on top of the screen
        this.dropX = Math.randomRange(0, 4)
        this.dropY = 0
        //Sets a random brightness
        this.dropB = Math.randomRange(100, 255)
        //Reference to the next element
        this.nextDrop = null
    }
}

class droplets {
    head: dropNode
    constructor() {
        this.head = null
    }
    addDrop() {
        const newDrop = new dropNode()
        //Initialize the head of linked list on first run
        if (this.head == null) {
            this.head = newDrop
            led.plotBrightness(this.head.dropX, this.head.dropY, this.head.dropB)
        } else {
            //Iterate through list
            let current = this.head
            while (current.nextDrop) {
                current = current.nextDrop
            }
            //Add new element at the end
            current.nextDrop = newDrop
            led.plotBrightness(current.nextDrop.dropX, current.nextDrop.dropY, current.nextDrop.dropB)
        }
    }
    fall() {
        //When a drop reaches the end of screen, delete sprite and move head to next element
        while (this.head.dropY == 4) {
            led.unplot(this.head.dropX, this.head.dropY)
            this.head = this.head.nextDrop
        }
        //Iterate through linked list, moving drops down the screen
        let current = this.head
        while (current.nextDrop) {
            led.unplot(current.dropX, current.dropY)
            current.dropY++
            led.plotBrightness(current.dropX, current.dropY, current.dropB)
            current = current.nextDrop
        }
    }
    //Removes the linked list
    delDrops() {
        this.head = null
    }
}

function rain() {
    //creates the linked list object
    let rain = new droplets()
    let dropNum: number
    while (asleep && scrSel == 0) {
        //creates between 1 and 3 new drops at the top of the screen
        dropNum = Math.randomRange(1, 3)
        for (let index = 0; index < dropNum; index++) {
            rain.addDrop()
        }
        basic.pause(100)
        rain.fall()
    }
    if (scrSel != 0) {
        rain.delDrops()
    }
}

basic.forever(function () {
    rain()
})
