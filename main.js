const passedLevelsColor = ["red", "orange", "yellow", "green", "blue", "blueviolet"]
const passedLevelsShadow = ["rgb(150, 0, 0)", "rgb(181, 122, 0)", "rgb(150, 150, 0)", "rgb(0, 150, 0)", "rgb(0, 0, 150)", "rgb(74, 21, 125)"]

const loadMainPage = () => {
    const passedLevels = localStorage.getItem('pass')
    if (passedLevels){
        console.log(passedLevels);
        for (let i = 0; i < passedLevels.length; i++) {
            document.getElementById('level' + passedLevels[i]).style.backgroundColor = passedLevelsColor[i];
            document.getElementById('level' + passedLevels[i]).style.boxShadow = "2vw 1.5vw 1vw " + passedLevelsShadow[i];
            document.getElementById('level' + passedLevels[i]).innerHTML = "";
        }
    }
    setTimeout(() => {
        document.getElementById('black-out').style.display = 'none';
    }, 1000);
}


const goTo = (loc, w, level) => {
    localStorage.setItem('word', w)
    localStorage.setItem('level', level);
    document.getElementById('black-out').style.animation = 'darken 1s ease-out forwards';
    document.getElementById('black-out').style.display = 'block';
    setTimeout(() => {
        window.location = loc;
    }, 1000);  
}

