# Tray.io technical challenge

## Description

This is my solution for the tray.io technical challenge.


## Usage & Dependencies

First, please make sure you have node installed. I am running v13.12.0 at this time of this writing.

This program reads input from the file named 'input.txt'. To run the program, run the following command from your terminal while in the root directory of this repo.

```
node app.js
```


## Technical Details

Before I started coding, below were my list of assumptions and questions:
- Assumption: The first line will contain the X and Y room dimension values separated by a space
- Assumption: The second line will contain the X and Y roomba position values separated by a space
- Assumption: The last line will contain the instruction set for the roomba
- Assumption: Any remaining line between the second and last line will contain the X and Y dirt locations separated by a space. It is possible to have zero dirt locations.
- Assumption: Roomba is always 'on', so it can start cleaning from the start position
- Question: Can the driving instructions contain something outside of the cardinal directions?
- Question: Can there be repeating dirt locations?
- Question: Can any of the dirt locations be outside of the room dimensions?
- Question: Can any of the X or Y values be negative?


In this implementation, I introduce a Roomba class that knows the following details:
- Dimensions of the room
- Current location
- Number of dirts cleaned
- Dirt locations

I considered using a set rather than an array to store the dirt locations but I went with the array since the test data set was not very large and it was easier to implement. In a situation where the input data set is very large, the benefits of using a set would be a faster lookup time. That implementation would look something like this:

```js
this.dirtsSet = new Set();
dirtLocations.forEach(dirt => {
    const key = dirt[0] + "" + dirt[1];
    this.dirtsSet.add(key);
});
```

Further, if this problem extends to scenarios where the dirt locations can be outside of the room dimensions then the problem opens up to possible large data sets and negative X/Y values. This implementation assumes there are no dirt locations outside of the room, but if there were, then the implementation would need to consider an alternative solution for storing the dirt locations (for example: tuples, two dimensional array, etc.) to handle the negative symbol. This also introduces the possibility of the roomba starting from outside of the room, which is an additional validation that would need to be added.

Regarding the question of repeating dirt locations, this implementation assumes there are none. By using indexOf() and splice(), this implementation is specifically targetting one dirt location to remove. If there were repeating dirt locations, then this solution would have to traverse the entire array to ensure all repeats were removed (which would be terribly slow and inefficient).

This implementation will throw an error if there are any driving instructions outside of the cardinal directions ('N', 'E', 'S', 'W').


## Thank you

Thanks for the opportunity to work on this, I had fun putting together the solution for this challenge!