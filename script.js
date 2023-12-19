class SimonGame {
    constructor() {
        this.level = 0;
        this.sequence = [];
        this.humanSequence = [];
        this.boxes = document.getElementsByClassName('colorbox');
        this.levelElement = document.getElementById('level');
    }

    //Make a next level
    nextLevel() {
        this.level++;
        this.sequence.push(this.randomBox());
        this.showSequence();
        this.showLevel();
    }

    //Make a random index of the boxes
    randomBox() {
        let randomIndex = Math.floor(Math.random() * this.boxes.length);
        return this.boxes[randomIndex];
    }

    //Brighten when the user clicks
    brightenBox(box) {
        box.classList.add('highlight');

        setTimeout(() => {
            box.classList.remove('highlight');
        }, 500);
    }


    //setTimeout は一度だけ遅延して実行される。
    //setInterval は繰り返し定期的に実行される。
    //Display the sequence to the user. When it finishes, clear the interval.
    showSequence() {
        let index = 0;
        let settingInterval = setInterval(() => {
            this.brightenBox(this.sequence[index]);
            index++;
            if (index === this.sequence.length) {
                clearInterval(settingInterval);
            }
        }, 1000);
    }

    //ユーザーがクリックしたボックス（box）を humanSequence 配列の末尾に追加
    //Add the array of the clicking history into the array of humanSequence
    addHumanSequence(box) {
        this.humanSequence.push(box)
    }

    //Check if the answer is right
    checkSequence() {
        for (let i = 0; i < this.humanSequence.length; i++) {
            if (this.sequence[i] !== this.humanSequence[i]) {
                document.getElementById('commentbox').innerText = 'WRONG. Try again!';
                this.humanSequence = [];
                this.showSequence();
                document.getElementById('continue').style.display = 'none';
                console.log('wrong');
                setTimeout(() => {
                    document.getElementById('commentbox').innerText = '';
                }, 1500);
                return;
            }
        }

        if (this.sequence.length === this.humanSequence.length) {
            document.getElementById('commentbox').innerText = 'CORRECT! Continue to the next level!';
            this.humanSequence = [];
            console.log('correct');
            // this.nextLevel();
            setTimeout (()=> {
                // this.nextLevel();
                document.getElementById('continue').style.display = 'block';
            }, 500);

        }
    }

    showLevel(){
        this.levelElement.innerText = `Level: ${this.level}`;
    }

    //Reset the game. Clear the level, the sequence and the humanSequence
    resetGame() {
        this.level = 0;
        this.sequence = [];
        this.humanSequence = [];
    }



}


let simonGame;

document.getElementById('start').addEventListener('click', () => {
    simonGame = new SimonGame();
    simonGame.nextLevel();

    for (let box of simonGame.boxes) {
        box.addEventListener('click', () => {
            simonGame.addHumanSequence(box);
        });
    }
    setTimeout(() => {
        document.getElementById('start').style.display = 'none';
    }, 100);

});

document.getElementById('process').addEventListener('click', () => {
    simonGame.checkSequence();
});

document.getElementById('continue').addEventListener('click', () => {
    simonGame.nextLevel();
    document.getElementById('continue').style.display = 'none';
    setTimeout(() => {
       document.getElementById('commentbox').innerText = ''; 
    }, 300);
});

document.getElementById('reset').addEventListener('click', () => {
    simonGame.resetGame();
    document.getElementById('commentbox').innerText = '';
    document.getElementById('continue').style.display = 'none';
    document.getElementById('level').style.display = 'none';
    document.getElementById('start').style.display = 'block';
});



//To Make a random color directly with rgb
// const button = document.querySelector('button');
// let h1 = document.querySelector('h1');

// button.addEventListener('click', () => {
// const newColor = makeRandColor();

// document.body.style.backgroundColor = newColor;
// h1.innerText = newColor;

// });

// const makeRandColor = () => {

//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);

//     return `rgb(${r}, ${g}, ${b}`
// }


