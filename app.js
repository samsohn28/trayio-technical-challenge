/** Module dependencies */
const fs = require('fs');


/** Create roomba class */
class Roomba {
    constructor(Xmax, Ymax, roombaX, roombaY, dirtlocations) {
        this.Xmax = Xmax;
        this.Ymax = Ymax;
        this.roombaX = roombaX;
        this.roombaY = roombaY;
        this.numDirts = 0;
        this.dirtlocations = dirtlocations;
        this.checkDirt();
    }

    // Compare the current location to the array of dirt locations
    // If found, increment numDirts and remove the dirt location from the array
    checkDirt() {
        let currentLocation = this.roombaX + "" + this.roombaY;
        if (this.dirtlocations.includes(currentLocation)) {
            this.numDirts++;
            this.dirtlocations.splice(this.dirtlocations.indexOf(currentLocation),1);
        }
    }

    // Move the roomba based on the instruction
    // If the movement would exceed the boundaries of the room, stay in place
    // Check for dirt in the new roomba location
    move(direction) {
        switch (direction) {
            case 'N':
                this.roombaY += 1;
                break;
            case 'S':
                this.roombaY -= 1;
                break;
            case 'E':
                this.roombaX += 1;
                break;
            case 'W':
                this.roombaX -= 1;
                break;

            default:
                throw new Error('invalid direction');
        }
    
        if (this.roombaY >= this.Ymax) this.roombaY = this.Ymax;
        if (this.roombaY <= 0) this.roombaY = 0;
        if (this.roombaX >= this.Xmax) this.roombaX = this.Xmax;
        if (this.roombaX <= 0) this.roombaX = 0;

        this.checkDirt();
    }

    // Return the current roomba location separated by a space
    getPosition() {
        return this.roombaX + " " + this.roombaY;
    }

    // Return the number of dirt spots cleaned
    getDirts() {
        return this.numDirts;
    }
}

/*  Create an instance of the roomba based on the data from the input file 
    List of assumptions on the input file data:
        The first line contains 2 numbers separated by a space representing the dimensions of the room
        The second line contains 2 numbers separated by a space representing the current location of the roomba
        The last line contains a string of instructions
        Any remaining lines contains 2 numbers separated by a space represting dirt locations
*/

let data = fs.readFileSync('input.txt').toString().split("\n")
let dimensions = data.shift().split(' ');
let startlocation = data.shift().split(' ');
let instructions = data.pop();
let dirtlocations = [];
while (data.length > 0) {
    dirtlocations.push(data.shift().replace(/ +/g, ""));
}

const roomba = new Roomba(parseInt(dimensions[0]),
                          parseInt(dimensions[1]),
                          parseInt(startlocation[0]),
                          parseInt(startlocation[1]),
                          dirtlocations);
instructions.split("").forEach(direction => roomba.move(direction));
console.log(roomba.getPosition());
console.log(roomba.getDirts());

