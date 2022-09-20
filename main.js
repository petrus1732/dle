const passedLevelsColor = ["red", "orange", "yellow", "green", "blue", "purple"]

const loadMainPage = () => {
    const passedLevels = localStorage.getItem('pass')
    if (passedLevels){
        console.log(passedLevels);
        for (let i = 0; i < passedLevels.length; i++) {
            document.getElementById('level' + passedLevels[i]).style.backgroundColor = passedLevelsColor[i];
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

