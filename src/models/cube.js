const uniqId = require('uniqid');

class Cube {
    
    static cubes = [
        {
            id: 'b43xjtskuf45k01',
            name: 'Magic Cube ',
            description: 'erer',
            imageUrl: 'https://m.media-amazon.com/images/I/41KNQRXAYvL._AC_SY580_.jpg',
            difficulty: '4'
          }
    ];

    constructor (name, description, imageUrl, difficulty) {
        this.id = uniqId();
        this.name = name; 
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficulty = difficulty;
    }

    static getAll() {
        return Cube.cubes.slice();
    }

    static add(cube) {
        Cube.cubes.push(cube);
    }

    static get () {
        return Cube.cubes.slice();
    }
}

module.exports = Cube;