const uniqId = require('uniqid');

class Cube {

    static #cubes = [
        {
            id: 'b43xjtskuf45k01',
            name: 'Magic Cube ',
            description: 'erer',
            imageUrl: 'https://m.media-amazon.com/images/I/41KNQRXAYvL._AC_SY580_.jpg',
            difficulty: '4'
        },
        {
            id: 'b43x8v0kuf9xog6',
            name: 'Cute cube ',
            description: 'Verry cute one ',
            imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/025/477/013/large/kotanko-3d-cartoon-cube-panda-0012.jpg?1585916756',
            difficulty: '1'
        },
        {
            id: 'b43x8v0kuf9ztrv',
            name: 'mirror cube ',
            description: 'hard to do it ',
            imageUrl: 'https://m.media-amazon.com/images/I/51pjlV9U54L._AC_SX425_.jpg',
            difficulty: '5'
        },
        {
            id: 'b43x8v0kufa2sa0',
            name: 'Kitty Cube ',
            description: 'Cute one ',
            imageUrl: 'https://www.craftybunnybun.com/hubfs/IMG_20180817_195101.jpg',
            difficulty: '1'
        }
    ];

    constructor(name, description, imageUrl, difficulty) {
        this.id = uniqId();
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficulty = difficulty;
    }

    static add(cube) {
        Cube.#cubes.push(cube);
    }

    static get cubes() {
        return Cube.#cubes.slice();
    }
}

module.exports = Cube;