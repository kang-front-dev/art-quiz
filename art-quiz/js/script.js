//
//
//
// ------------------------AUDIO----------------------------
//
//
//
let lofiJazz1 = new Audio();
lofiJazz1.src = 'assets/audio/lofi-jazz-1.mp3';
lofiJazz1.setAttribute('autoplay', 'true');
lofiJazz1.setAttribute('muted', 'muted');
let lofiJazz2 = new Audio();
lofiJazz2.src = 'assets/audio/lofi-jazz-2.mp3';

lofiJazz1.volume = 0;
lofiJazz2.volume = 0;

let lofiJazzArr = [lofiJazz1, lofiJazz2];

let roundEndSound = new Audio();
roundEndSound.src = 'assets/audio/roundEnd.mp3';

let correctSound = new Audio();
correctSound.src = 'assets/audio/correct.mp3';
let wrongSound = new Audio();
wrongSound.src = 'assets/audio/wrong.mp3';

function musicStart(num) {
  if (!num) {
    lofiJazzArr[0].play();
  } else {
    lofiJazzArr[num].play();
  }
}

let clickSound1 = new Audio();
clickSound1.src = 'assets/audio/click1.mp3';
let clickSound2 = new Audio();
clickSound2.src = 'assets/audio/click2.mp3';

clickSound1.volume = 0.2;
clickSound2.volume = 0.2;
roundEndSound.volume = 0.2;
correctSound.volume = 0.2;
wrongSound.volume = 0.2;

let soundArr = [
  clickSound1,
  clickSound2,
  roundEndSound,
  correctSound,
  wrongSound,
];

lofiJazz1.addEventListener('timeupdate', () => {
  if (lofiJazz1.duration === lofiJazz1.currentTime) {
    musicStart(1);
  }
});
lofiJazz2.addEventListener('timeupdate', () => {
  if (lofiJazz2.duration === lofiJazz2.currentTime) {
    musicStart(0);
  }
});

let musicBtn = document.querySelector('#music-btn');
let volumeBtn = document.querySelector('#volume-btn');
let musicIcon = musicBtn.querySelector('i');
let volumeIcon = volumeBtn.querySelector('i');

let settingsMusicBtn = document.querySelector('#settings-music-btn');
let settingsMusicIcon = settingsMusicBtn.querySelector('i');
let settingsVolumeBtn = document.querySelector('#settings-volume-btn');
let settingsVolumeIcon = settingsVolumeBtn.querySelector('i');

let musicPrevVolume = 0.2;
let clickPrevVolume = 0.3;
function audioVolumeToggle() {
  if (
    musicIcon.classList.contains('icon-music-mute') ||
    settingsMusicIcon.classList.contains('icon-music-mute')
  ) {
    if (lofiJazz1.volume !== 0) {
      musicPrevVolume = lofiJazz1.volume;
    }
    lofiJazz1.volume = 0;
    lofiJazz2.volume = 0;
  } else {
    lofiJazz1.volume = musicPrevVolume;
    lofiJazz2.volume = musicPrevVolume;
  }

  if (
    volumeIcon.classList.contains('icon-volume-mute') ||
    settingsVolumeIcon.classList.contains('icon-volume-mute')
  ) {
    if (clickSound1.volume !== 0) {
      clickPrevVolume = clickSound1.volume;
    }
    soundArr.forEach((item) => {
      let sound = item;
      sound.volume = 0;
    });
  } else {
    soundArr.forEach((item) => {
      let sound = item;
      sound.volume = clickPrevVolume;
    });
  }
}
audioVolumeToggle();
function playClick() {
  let randomNum = randomNumber(1, 2);
  soundArr[randomNum].play();
  setTimeout(() => {
    soundArr[randomNum].pause();
    soundArr[randomNum].currentTime = 0;
  }, 50);
}

musicBtn.addEventListener('click', () => {
  musicIcon.classList.toggle('icon-music-mute');
  settingsMusicIcon.classList.toggle('icon-music-mute');
  audioVolumeToggle();
  musicStart();
});
volumeBtn.addEventListener('click', () => {
  volumeIcon.classList.toggle('icon-volume-mute');
  settingsVolumeIcon.classList.toggle('icon-volume-mute');
  audioVolumeToggle();
});
settingsMusicBtn.addEventListener('click', () => {
  musicIcon.classList.toggle('icon-music-mute');
  settingsMusicIcon.classList.toggle('icon-music-mute');
  audioVolumeToggle();
  musicStart();
});
settingsVolumeBtn.addEventListener('click', () => {
  volumeIcon.classList.toggle('icon-volume-mute');
  settingsVolumeIcon.classList.toggle('icon-volume-mute');
  audioVolumeToggle();
});

document.addEventListener('click', () => {
  playClick();
});

//
//
//
// --------------------------------GENERATING--------------------------
//
//
//

let globalWrapper = document.querySelector('.global-wrapper');
let wrapper = document.querySelector('.wrapper');
let cellsAmount = Math.floor(document.documentElement.clientWidth / 30);
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
let excArr = [];
function randomNumberExc(min, max, exc) {
  console.log('exc: ' + exc);
  let result = Math.floor(Math.random() * (max - min) + min);
  let repeating = false;
  // console.log('exc: ' + exc);
  exc.forEach((num) => {
    // console.log('num: ' + num + ' comparing to: ' + result);
    if (num === result) {
      repeating = true;
    } else if (images[num].author === images[result].author) {
      repeating = true;
    }
  });

  if (repeating) {
    return randomNumberExc(min, max, exc);
  } else {
    excArr.push(result);
    return result;
  }
}
function generateBackground(amount) {
  if (amount !== 1) {
    let newCell = document.createElement('div');
    globalWrapper.appendChild(newCell);
    newCell.className = 'background-cell';
    let size = randomNumber(80, 110);
    newCell.style.width = `${size}px`;
    newCell.style.height = `${size}px`;
    let shadowValue = Math.floor(size / 10);
    newCell.style.boxShadow = `0px 0px ${shadowValue}px 0px rgb(23, 23, 23)`;
    newCell.style.backgroundImage = `url(assets/img/source/${amount}.jpg)`;
    newCell.style.backgroundPosition = 'center';
    newCell.style.backgroundSize = 'cover';
    let offsetLeft = randomNumber(0, 90);
    newCell.style.position = 'absolute';
    newCell.style.left = `${offsetLeft}%`;
    let animationDuration = randomNumber(17, 23);
    newCell.style.animation = `falling ${animationDuration}s linear infinite`;
    setTimeout(() => {
      generateBackground(amount - 1);
    }, 1000);
  }
}
generateBackground(cellsAmount);
//
//
//
// -----------------category-CATEGORIES-------------------
//
//
//
document.addEventListener('touchstart', function () {}, true);

let mainMenu = document.getElementById('main-menu');
let artistsBtn = document.getElementById('artists-btn').children[0];
let artistsLvls = document.getElementById('artists-cards');

let picturesBtn = document.getElementById('pictures-btn').children[0];
let picturesLvls = document.getElementById('pictures-cards');

let lvlCardsAmount = 12;

function updateScore() {
  let artists = artistsLvls.querySelectorAll('.category-lvl');
  let pictures = picturesLvls.querySelectorAll('.category-lvl');
  let score = 0;
  for (let i = 0; i < artists.length; i++) {
    let scoreText = artists[i].querySelector('.category-lvl-score');
    if (localStorage.getItem(`artistsStage${i + 1}Score`)) {
      score = localStorage.getItem(`artistsStage${i + 1}Score`);
      scoreText.textContent = `${score}/10`;
    } else {
      score = 0;
      scoreText.textContent = `${score}/10`;
    }
    let stars = artists[i].querySelectorAll('i');

    let amountOfSolid = 0;
    if (Number(score) === 10) {
      amountOfSolid = 3;
    } else if (score >= 8) {
      amountOfSolid = 2;
    } else if (score >= 5) {
      amountOfSolid = 1;
    }
    for (let t = 0; t < amountOfSolid; t++) {
      stars[t].className = 'fas fa-star icon-solid-star';
    }

    if (localStorage.getItem(`artistsStage${i+1}Score`)) {
      artists[i].classList.add('category-lvl-active');
      console.log('played!');
    }

  }
  for (let i = 0; i < pictures.length; i++) {
    let scoreText = pictures[i].querySelector('.category-lvl-score');
    let score = 0;
    if (localStorage.getItem(`picturesStage${i + 1}Score`)) {
      score = localStorage.getItem(`picturesStage${i + 1}Score`);
      scoreText.textContent = `${score}/10`;
    } else {
      score = 0;
      scoreText.textContent = `${score}/10`;
    }
    let stars = pictures[i].querySelectorAll('i');

    let amountOfSolid = 0;
    if (score >= 5) {
      amountOfSolid = 1;
      if (score >= 8) {
        amountOfSolid = 2;
        if (score === 10) {
          amountOfSolid = 3;
        }
      }
    }
    for (let t = 0; t < amountOfSolid; t++) {
      stars[t].className = 'fas fa-star icon-solid-star';
    }
  }

  
}

function generateLvlCardBg(amount, mode) {
  if (amount > 0) {
    if (mode === 'artists') {
      let card = document.querySelector(`#artists-card-${amount}`);
      let imgNum = amount * 10;
      card.style.backgroundImage = `url('assets/img/source/${imgNum}.jpg')`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';
      generateLvlCardBg(amount - 1, 'artists');
    } else if (mode === 'pictures') {
      let card = document.querySelector(`#pictures-card-${amount}`);
      if (localStorage.getItem(`picturesStage${amount}Score`)) {
        card.classList.add('category-lvl-active');
      }
      let imgNum = (amount + 12) * 10;
      card.style.backgroundImage = `url('assets/img/source/${imgNum}.jpg')`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';
      generateLvlCardBg(amount - 1, 'pictures');
    }
  }
}

artistsBtn.addEventListener('click', () => {
  mainMenu.classList.remove('main-menu-active');
  artistsLvls.classList.add('category-lvls-active');
  updateScore();
  generateLvlCardBg(lvlCardsAmount, 'artists');
});
picturesBtn.addEventListener('click', () => {
  mainMenu.classList.remove('main-menu-active');
  picturesLvls.classList.add('category-lvls-active');
  updateScore();
  generateLvlCardBg(lvlCardsAmount, 'pictures');
});

let artistsBtnBack = document.querySelector('#artists-btn-back');
let picturesBtnBack = document.querySelector('#pictures-btn-back');

artistsBtnBack.addEventListener('click', () => {
  mainMenu.classList.add('main-menu-active');
  artistsLvls.classList.remove('category-lvls-active');
  updateScore();
});
picturesBtnBack.addEventListener('click', () => {
  mainMenu.classList.add('main-menu-active');
  picturesLvls.classList.remove('category-lvls-active');
  updateScore();
});

//
//
//
// --------------------------GALLERY------------------------------
//
//
//

let gallery = document.querySelector('.gallery');
let galleryGrid = document.querySelector('.gallery-grid');
let galleryBtn = document.querySelector('#gallery-btn');
let galleryBtnBack = document.querySelector('#gallery-btn-back');
let galleryCardCount = 240;
let galleryBasicAmount = 0;
let generatedAmount = 0;

function generateArtistsRoundDescr(lvlNum, lvlStage) {
  let currentObjectKey = lvlStage * 10 - 10 + lvlNum - 1;
  console.log(currentObjectKey);
  let roundDescr = document.createElement('div');
  roundDescr.className = 'round-descr';
  wrapper.appendChild(roundDescr);

  let btnBack = document.createElement('div');
  btnBack.className = 'category-btn-back';
  btnBack.id = 'round-descr-lvl-btn-back';
  let iconBack = document.createElement('i');
  iconBack.className = 'fal fa-undo icon-back';
  btnBack.appendChild(iconBack);
  roundDescr.appendChild(btnBack);
  btnBack.addEventListener('click', () => {
    roundDescr.remove();
    artistsLvls.classList.add('category-lvls-active');
  });

  let roundDescrTitle = document.createElement('div');
  roundDescrTitle.className = 'round-descr-title';
  roundDescrTitle.textContent = `0${lvlStage} level`;
  roundDescr.appendChild(roundDescrTitle);

  let roundDescrStars = document.createElement('div');
  roundDescrStars.className = 'round-descr-stars';
  roundDescr.appendChild(roundDescrStars);

  let roundDescrWrapper = document.createElement('div');
  roundDescrWrapper.className = 'round-descr-wrapper';
  roundDescr.appendChild(roundDescrWrapper);

  let rightAnswersCounter = 0;
  for (let i = 0; i < 10; i++) {
    let roundDescrCard = document.createElement('div');
    roundDescrCard.className = 'round-descr-card';
    let roundDescrCardImg = document.createElement('img');
    roundDescrCardImg.className = 'round-descr-card-img';
    roundDescrCardImg.src = `assets/img/source/${currentObjectKey + i}.jpg`;
    roundDescrCard.appendChild(roundDescrCardImg);
    let roundDescrCardState = document.createElement('i');
    console.log(`artistsStage${lvlStage}Lvl${i}Answer`);
    if (localStorage.getItem(`artistsStage${lvlStage}Score`)) {
      if (
        localStorage.getItem(`artistsStage${lvlStage}Lvl${i + 1}Answer`) &&
        localStorage.getItem(`artistsStage${lvlStage}Lvl${i + 1}Answer`) === '1'
      ) {
        roundDescrCardState.className = 'fas fa-check icon-correct';
        console.log('correct');
        rightAnswersCounter += 1;
      } else {
        roundDescrCardState.className = 'fas fa-check icon-wrong';
        console.log('cant get it');
      }
    } else {
      roundDescrCardState.className = 'fas fa-check icon-wrong';
    }

    roundDescrCard.appendChild(roundDescrCardState);
    roundDescrWrapper.appendChild(roundDescrCard);
    console.log(currentObjectKey + i);
  }

  for (let i = 0; i < 3; i++) {
    let roundDescrStar = document.createElement('i');
    roundDescrStar.className = 'fal fa-star icon-light-star';

    roundDescrStars.appendChild(roundDescrStar);
  }
  let stars = roundDescrStars.querySelectorAll('i');
  console.log(rightAnswersCounter);
  if (rightAnswersCounter === 10) {
    stars[2].className = 'fas fa-star icon-solid-star';
  }
  if (rightAnswersCounter >= 8) {
    stars[1].className = 'fas fa-star icon-solid-star';
  }
  if (rightAnswersCounter >= 5) {
    stars[0].className = 'fas fa-star icon-solid-star';
  }
  let roundDescrScore = document.createElement('div');
  roundDescrScore.className = 'round-descr-score';

  roundDescrScore.textContent = `${rightAnswersCounter}/10`;
  roundDescr.appendChild(roundDescrScore);

  let roundDescrBtn = document.createElement('div');
  roundDescrBtn.className = 'round-descr-btn';
  roundDescrBtn.textContent = 'Play';
  roundDescr.appendChild(roundDescrBtn);
  roundDescrBtn.addEventListener('click', () => {
    roundDescr.remove();
    generateArtistsLvl(lvlNum, lvlStage);
  });
}
function generatePicturesRoundDescr(lvlNum, lvlStage) {
  let currentObjectKey = lvlStage * 10 + 120 - 10 + lvlNum - 1;
  console.log(currentObjectKey);
  let roundDescr = document.createElement('div');
  roundDescr.className = 'round-descr';
  wrapper.appendChild(roundDescr);

  let btnBack = document.createElement('div');
  btnBack.className = 'category-btn-back';
  btnBack.id = 'round-descr-lvl-btn-back';
  let iconBack = document.createElement('i');
  iconBack.className = 'fal fa-undo icon-back';
  btnBack.appendChild(iconBack);
  roundDescr.appendChild(btnBack);
  btnBack.addEventListener('click', () => {
    roundDescr.remove();
    picturesLvls.classList.add('category-lvls-active');
  });

  let roundDescrTitle = document.createElement('div');
  roundDescrTitle.className = 'round-descr-title';
  roundDescrTitle.textContent = `0${lvlStage} level`;
  roundDescr.appendChild(roundDescrTitle);

  let roundDescrStars = document.createElement('div');
  roundDescrStars.className = 'round-descr-stars';
  roundDescr.appendChild(roundDescrStars);

  let roundDescrWrapper = document.createElement('div');
  roundDescrWrapper.className = 'round-descr-wrapper';
  roundDescr.appendChild(roundDescrWrapper);

  let rightAnswersCounter = 0;
  for (let i = 0; i < 10; i++) {
    let roundDescrCard = document.createElement('div');
    roundDescrCard.className = 'round-descr-card';
    let roundDescrCardArtist = document.createElement('div');
    roundDescrCardArtist.className = 'round-descr-card-artist';
    roundDescrCardArtist.textContent = images[currentObjectKey + i].author;
    roundDescrCard.appendChild(roundDescrCardArtist);
    let roundDescrCardState = document.createElement('i');
    if (localStorage.getItem(`artistsStage${lvlStage}Score`)) {
      if (
        localStorage.getItem(`picturesStage${lvlStage}Lvl${i + 1}Answer`) &&
        localStorage.getItem(`picturesStage${lvlStage}Lvl${i + 1}Answer`) ===
          '1'
      ) {
        roundDescrCardState.className = 'fas fa-check icon-correct';
        rightAnswersCounter += 1;
      } else {
        roundDescrCardState.className = 'fas fa-check icon-wrong';
      }
    } else {
      roundDescrCardState.className = 'fas fa-check icon-wrong';
    }
    roundDescrCard.appendChild(roundDescrCardState);
    roundDescrWrapper.appendChild(roundDescrCard);
  }

  for (let i = 0; i < 3; i++) {
    let roundDescrStar = document.createElement('i');
    roundDescrStar.className = 'fal fa-star icon-light-star';

    roundDescrStars.appendChild(roundDescrStar);
  }
  let stars = roundDescrStars.querySelectorAll('i');
  console.log(rightAnswersCounter);
  if (rightAnswersCounter === 10) {
    stars[2].className = 'fas fa-star icon-solid-star';
    console.log('wdwad');
  }
  if (rightAnswersCounter >= 8) {
    stars[1].className = 'fas fa-star icon-solid-star';
    console.log('wdwad');
  }
  if (rightAnswersCounter >= 5) {
    stars[0].className = 'fas fa-star icon-solid-star';
    console.log('wdwad');
  }

  let roundDescrScore = document.createElement('div');
  roundDescrScore.className = 'round-descr-score';
  roundDescrScore.textContent = `${rightAnswersCounter}/10`;

  roundDescr.appendChild(roundDescrScore);

  let roundDescrBtn = document.createElement('div');
  roundDescrBtn.className = 'round-descr-btn';
  roundDescrBtn.textContent = 'Play';
  roundDescr.appendChild(roundDescrBtn);
  roundDescrBtn.addEventListener('click', () => {
    roundDescr.remove();
    generatePicturesLvl(lvlNum, lvlStage);
  });
}

function generateGalleryCard(num) {
  if (generatedAmount !== galleryCardCount) {
    let newCard = document.createElement('div');
    newCard.className = 'gallery-card';
    let newImg = document.createElement('img');
    newImg.className = 'gallery-card-img';
    newImg.src = `assets/img/source/${num}.jpg`;
    let newDiv = document.createElement('div');
    newDiv.className = 'gallery-card-text';
    let newName = document.createElement('h3');
    newName.className = 'gallery-card-name';
    newName.textContent = images[num].name;
    let newAuthor = document.createElement('h4');
    newAuthor.className = 'gallery-card-author';
    newAuthor.textContent = images[num].author;
    let newYear = document.createElement('h5');
    newYear.className = 'gallery-card-year';
    newYear.textContent = images[num].year + 'г';

    newDiv.appendChild(newName);
    newDiv.appendChild(newAuthor);
    newDiv.appendChild(newYear);

    newCard.appendChild(newImg);
    newCard.appendChild(newDiv);

    galleryGrid.appendChild(newCard);
    generatedAmount += 1;
    galleryBasicAmount += 1;
  }
}

function setRecursive(amount, func) {
  if (amount > 0) {
    func(galleryBasicAmount);
    setRecursive(amount - 1, func);
  }
}

galleryBtn.addEventListener('click', () => {
  mainMenu.classList.remove('main-menu-active');
  gallery.classList.add('gallery-active');
  setRecursive(8, generateGalleryCard);
});

galleryBtnBack.addEventListener('click', () => {
  mainMenu.classList.add('main-menu-active');
  gallery.classList.remove('gallery-active');
});

function generateOnScroll(amount) {
  setRecursive(amount, generateGalleryCard);
}

document.addEventListener('scroll', () => {
  let img = document.querySelectorAll('.gallery-card-img');
  if (img.length > 0) {
    let bounding = img[img.length - 1].getBoundingClientRect();

    let windowHeight = window.innerHeight;

    if (bounding.y < windowHeight) {
      generateOnScroll(6);
    }
  }
});
//
//
//
// -----------------------------GAME----------------------------
//
//
//

let artistsLvlsArr = artistsLvls.querySelectorAll('.category-lvl');
let picturesLvlsArr = picturesLvls.querySelectorAll('.category-lvl');

function deleteLvl(lvl) {
  lvl.remove();
}
let lvlScore;
function generateArtistsLvl(lvlNum, lvlStage, score) {
  if (!score) {
    lvlScore = 0;
  } else {
    lvlScore = score;
  }
  let currentObjectKey = lvlStage * 10 - 10 + lvlNum - 1;
  let lvl = document.createElement('div');
  lvl.className = 'artists-lvl';
  lvl.id = `artists-lvl-${lvlStage}`;
  wrapper.appendChild(lvl);

  let btnBack = document.createElement('div');
  btnBack.className = 'category-btn-back';
  btnBack.id = 'artists-lvl-btn-back';
  let iconBack = document.createElement('i');
  iconBack.className = 'fal fa-undo icon-back';
  btnBack.appendChild(iconBack);
  lvl.appendChild(btnBack);

  let lvlWrapper = document.createElement('div');
  lvlWrapper.className = 'artists-lvl-wrapper';
  lvl.appendChild(lvlWrapper);

  let lvlResult = document.createElement('div');
  lvlResult.className = 'lvl-result';
  lvlWrapper.appendChild(lvlResult);

  let lvlResultText = document.createElement('div');
  lvlResultText.className = 'lvl-result-text';
  lvlResult.appendChild(lvlResultText);

  let lvlResultImg = document.createElement('img');
  lvlResultImg.src = `assets/img/source/${currentObjectKey}.jpg`;
  lvlResultImg.className = 'lvl-result-img';
  lvlResult.appendChild(lvlResultImg);

  let lvlResultTitle = document.createElement('h2');
  lvlResultTitle.className = 'lvl-result-title';
  lvlResultTitle.textContent = images[currentObjectKey].name;
  lvlResult.appendChild(lvlResultTitle);

  let lvlResultAuthor = document.createElement('h3');
  lvlResultAuthor.className = 'lvl-result-author';
  lvlResultAuthor.textContent = images[currentObjectKey].author;
  lvlResult.appendChild(lvlResultAuthor);

  let lvlResultYear = document.createElement('h4');
  lvlResultYear.className = 'lvl-result-year';
  lvlResultYear.textContent = images[currentObjectKey].year + 'г';
  lvlResult.appendChild(lvlResultYear);

  let lvlResultBtn = document.createElement('div');
  lvlResultBtn.className = 'lvl-result-btn';
  lvlResultBtn.textContent = 'Продолжить';
  lvlResultBtn.addEventListener('click', () => {
    deleteLvl(lvl);
    if (lvlNum + 1 > 10) {
      artistsLvls.classList.add('artists-lvl-active');
      if (!localStorage.getItem(`artistsStage${lvlStage}Score`)) {
        localStorage.setItem(`artistsStage${lvlStage}Score`, lvlScore);
      } else {
        localStorage.removeItem(`artistsStage${lvlStage}Score`);
        localStorage.setItem(`artistsStage${lvlStage}Score`, lvlScore);
      }
      updateScore();
      roundEndSound.play();
    } else {
      generateArtistsLvl(lvlNum + 1, lvlStage, lvlScore);
    }
  });
  lvlResult.appendChild(lvlResultBtn);

  let lvlQuestion = document.createElement('h2');
  lvlQuestion.className = 'artists-lvl-question';
  lvlQuestion.textContent = 'Кто автор данной картины?';
  lvlWrapper.appendChild(lvlQuestion);

  let lvlImgBlock = document.createElement('div');
  lvlImgBlock.className = 'artists-lvl-img-block';
  lvlWrapper.appendChild(lvlImgBlock);

  let lvlImg = document.createElement('img');
  lvlImg.className = 'artists-lvl-img';
  lvlImg.src = `assets/img/source/${currentObjectKey}.jpg`;
  lvlImgBlock.appendChild(lvlImg);

  let lvlCounter = document.createElement('h4');
  lvlCounter.className = 'artists-lvl-counter';
  lvlCounter.textContent = `${lvlNum}/10`;
  lvlImgBlock.appendChild(lvlCounter);

  let lvlAnswerBlock = document.createElement('div');
  lvlAnswerBlock.className = 'artists-lvl-answers';
  lvlWrapper.appendChild(lvlAnswerBlock);

  let randomRightAnswer = randomNumber(1, 4);
  console.log('right answer: ' + (randomRightAnswer + 1));
  let maxNum = lvlStage * 10 + 20 > 240 ? 240 : lvlStage * 10 + 20;

  excArr = [currentObjectKey];
  for (let i = 0; i < 4; i++) {
    let lvlAnswer = document.createElement('div');
    lvlAnswer.className = 'artists-lvl-answer';
    lvlAnswer.id = `artists-stage-${lvlStage}-lvl-${lvlNum}-asnwer-${i}`;

    if (i !== randomRightAnswer) {
      let randomAuthorNum = randomNumberExc(lvlStage * 10 - 10, maxNum, excArr);

      lvlAnswer.textContent = images[randomAuthorNum].author;
      lvlAnswer.classList.add(`${randomAuthorNum}`);
    } else {
      lvlAnswer.textContent = images[currentObjectKey].author;
    }
    lvlAnswerBlock.appendChild(lvlAnswer);
    lvlAnswer.addEventListener('click', () => {
      if (i === randomRightAnswer) {
        lvlAnswer.classList.add('artists-right-answer');
        lvlResultText.classList.add('lvl-result-text-correct');
        lvlResultText.textContent = 'Верно!';
        lvlScore += 1;
        correctSound.play();
        setTimeout(() => {
          correctSound.pause();
          correctSound.currentTime = 0;
        }, 450);
        if (localStorage.getItem(`artistsStage${lvlStage}Lvl${lvlNum}Answer`)) {
          localStorage.removeItem(`artistsStage${lvlStage}Lvl${lvlNum}Answer`);
          localStorage.setItem(
            `artistsStage${lvlStage}Lvl${lvlNum}Answer`,
            '1'
          );
        } else {
          localStorage.setItem(
            `artistsStage${lvlStage}Lvl${lvlNum}Answer`,
            '1'
          );
        }
      } else {
        lvlAnswer.classList.add('artists-wrong-answer');
        lvlResultText.classList.add('lvl-result-text-wrong');
        lvlResultText.textContent = 'Неверно!';
        wrongSound.play();
        setTimeout(() => {
          wrongSound.pause();
          wrongSound.currentTime = 0;
        }, 450);
        if (localStorage.getItem(`artistsStage${lvlStage}Lvl${lvlNum}Answer`)) {
          localStorage.removeItem(`artistsStage${lvlStage}Lvl${lvlNum}Answer`);
          localStorage.setItem(
            `artistsStage${lvlStage}Lvl${lvlNum}Answer`,
            '0'
          );
        } else {
          localStorage.setItem(
            `artistsStage${lvlStage}Lvl${lvlNum}Answer`,
            '0'
          );
        }
      }
      lvlResult.classList.add('lvl-result-active');
    });
  }

  artistsLvls.classList.remove('category-lvls-active');
  lvl.classList.add('artists-lvl-active');

  btnBack.addEventListener('click', () => {
    artistsLvls.classList.add('category-lvls-active');
    deleteLvl(lvl);
  });
}

for (let i = 0; i < artistsLvlsArr.length; i++) {
  artistsLvlsArr[i].addEventListener('click', () => {
    artistsLvls.className = 'category-lvls';
    generateArtistsRoundDescr(1, i + 1);
  });
}

function generatePicturesLvl(lvlNum, lvlStage, score) {
  console.log(score);
  if (!score) {
    lvlScore = 0;
  } else {
    lvlScore = score;
  }
  let currentObjectKey = lvlStage * 10 + 120 - 10 + lvlNum - 1;
  let lvl = document.createElement('div');
  lvl.className = 'pictures-lvl';
  lvl.id = `pictures-lvl-${lvlStage}`;
  wrapper.appendChild(lvl);

  let btnBack = document.createElement('div');
  btnBack.className = 'category-btn-back';
  btnBack.id = 'pictures-lvl-btn-back';
  let iconBack = document.createElement('i');
  iconBack.className = 'fal fa-undo icon-back';
  btnBack.appendChild(iconBack);
  lvl.appendChild(btnBack);

  let lvlWrapper = document.createElement('div');
  lvlWrapper.className = 'pictures-lvl-wrapper';
  lvl.appendChild(lvlWrapper);

  let lvlResult = document.createElement('div');
  lvlResult.className = 'lvl-result';
  lvlWrapper.appendChild(lvlResult);

  let lvlResultText = document.createElement('div');
  lvlResultText.className = 'lvl-result-text';
  lvlResult.appendChild(lvlResultText);

  let lvlResultImg = document.createElement('img');
  lvlResultImg.src = `assets/img/source/${currentObjectKey}.jpg`;
  lvlResultImg.className = 'lvl-result-img';
  lvlResult.appendChild(lvlResultImg);

  let lvlResultTitle = document.createElement('h2');
  lvlResultTitle.className = 'lvl-result-title';
  lvlResultTitle.textContent = images[currentObjectKey].name;
  lvlResult.appendChild(lvlResultTitle);

  let lvlResultAuthor = document.createElement('h3');
  lvlResultAuthor.className = 'lvl-result-author';
  lvlResultAuthor.textContent = images[currentObjectKey].author;
  lvlResult.appendChild(lvlResultAuthor);

  let lvlResultYear = document.createElement('h4');
  lvlResultYear.className = 'lvl-result-year';
  lvlResultYear.textContent = images[currentObjectKey].year + 'г';
  lvlResult.appendChild(lvlResultYear);

  let lvlResultBtn = document.createElement('div');
  lvlResultBtn.className = 'lvl-result-btn';
  lvlResultBtn.textContent = 'Продолжить';
  lvlResultBtn.addEventListener('click', () => {
    deleteLvl(lvl);
    if (lvlNum + 1 > 10) {
      picturesLvls.classList.add('category-lvls-active');
      if (!localStorage.getItem(`picturesStage${lvlStage}Score`)) {
        localStorage.setItem(`picturesStage${lvlStage}Score`, lvlScore);
      } else {
        localStorage.removeItem(`picturesStage${lvlStage}Score`);
        localStorage.setItem(`picturesStage${lvlStage}Score`, lvlScore);
      }
      updateScore();
      roundEndSound.play();
    } else {
      generatePicturesLvl(lvlNum + 1, lvlStage, lvlScore);
    }
  });
  lvlResult.appendChild(lvlResultBtn);

  let lvlQuestion = document.createElement('h2');
  lvlQuestion.className = 'pictures-lvl-question';
  lvlQuestion.textContent = `Какую из данных картин написал ${images[currentObjectKey].author}?`;
  lvlWrapper.appendChild(lvlQuestion);

  let lvlCounter = document.createElement('h4');
  lvlCounter.className = 'pictures-lvl-counter';
  lvlCounter.textContent = `${lvlNum}/10`;
  lvlWrapper.appendChild(lvlCounter);

  let lvlAnswerBlock = document.createElement('div');
  lvlAnswerBlock.className = 'pictures-lvl-answers';
  lvlWrapper.appendChild(lvlAnswerBlock);

  let randomRightAnswer = randomNumber(1, 4);
  console.log('right answer: ' + (randomRightAnswer + 1));

  let maxNum = lvlStage * 10 + 20 > 240 ? 240 : lvlStage * 10 + 20;

  excArr = [currentObjectKey];
  for (let i = 0; i < 4; i++) {
    let lvlAnswer = document.createElement('div');
    lvlAnswer.className = 'pictures-lvl-answer';
    lvlAnswer.id = `pictures-stage-${lvlStage}-lvl-${lvlNum}-asnwer-${i}`;
    let lvlAnswerImg = document.createElement('img');
    lvlAnswerImg.className = 'pictures-lvl-answer-img';
    lvlAnswer.appendChild(lvlAnswerImg);
    if (i !== randomRightAnswer) {
      let randomAuthorNum = randomNumberExc(lvlStage * 10 - 10, maxNum, excArr);

      lvlAnswerImg.src = `assets/img/source/${images[randomAuthorNum].imageNum}.jpg`;
      lvlAnswer.classList.add(`${randomAuthorNum}`);
    } else {
      lvlAnswerImg.src = `assets/img/source/${images[currentObjectKey].imageNum}.jpg`;
    }
    lvlAnswerBlock.appendChild(lvlAnswer);
    lvlAnswer.addEventListener('click', () => {
      if (i === randomRightAnswer) {
        lvlAnswer.classList.add('right-answer');
        lvlResultText.classList.add('lvl-result-text-correct');
        lvlResultText.textContent = 'Верно!';
        lvlScore += 1;
        correctSound.play();
        setTimeout(() => {
          correctSound.pause();
          correctSound.currentTime = 0;
        }, 450);
        if (
          localStorage.getItem(`picturesStage${lvlStage}Lvl${lvlNum}Answer`)
        ) {
          localStorage.removeItem(`picturesStage${lvlStage}Lvl${lvlNum}Answer`);
          localStorage.setItem(
            `picturesStage${lvlStage}Lvl${lvlNum}Answer`,
            '1'
          );
        } else {
          localStorage.setItem(
            `picturesStage${lvlStage}Lvl${lvlNum}Answer`,
            '1'
          );
        }
      } else {
        lvlAnswer.classList.add('wrong-answer');
        lvlResultText.classList.add('lvl-result-text-wrong');
        lvlResultText.textContent = 'Неверно!';
        wrongSound.play();
        setTimeout(() => {
          wrongSound.pause();
          wrongSound.currentTime = 0;
        }, 450);
        if (
          localStorage.getItem(`picturesStage${lvlStage}Lvl${lvlNum}Answer`)
        ) {
          localStorage.removeItem(`picturesStage${lvlStage}Lvl${lvlNum}Answer`);
          localStorage.setItem(
            `picturesStage${lvlStage}Lvl${lvlNum}Answer`,
            '0'
          );
        } else {
          localStorage.setItem(
            `picturesStage${lvlStage}Lvl${lvlNum}Answer`,
            '0'
          );
        }
      }
      lvlResult.classList.add('lvl-result-active');
    });
  }
  picturesLvls.classList.remove('category-lvls-active');
  lvl.classList.add('pictures-lvl-active');

  btnBack.addEventListener('click', () => {
    deleteLvl(lvl);
    picturesLvls.classList.add('category-lvls-active');
  });
}

for (let i = 0; i < picturesLvlsArr.length; i++) {
  picturesLvlsArr[i].addEventListener('click', () => {
    picturesLvls.className = 'category-lvls';

    generatePicturesRoundDescr(1, i + 1);
  });
}
//
//
//
// -------------------------------SETTINGS--------------------------------
//
//
//
let settings = document.querySelector('.settings');
let settingsBtn = document.querySelector('#settings-btn');
let settingsBtnBack = document.querySelector('#settings-btn-back');

settingsBtn.addEventListener('click', () => {
  mainMenu.classList.remove('main-menu-active');
  settings.classList.add('settings-active');
});

settingsBtnBack.addEventListener('click', () => {
  mainMenu.classList.add('main-menu-active');
  settings.classList.remove('settings-active');
});

let musicProgress = document.querySelector('.settings-music-input');
let volumeProgress = document.querySelector('.settings-volume-input');

let musicVolumeValue = document.querySelector('.settings-music-value');
let clickVolumeValue = document.querySelector('.settings-volume-value');

function musicVolumeChange(value) {
  musicProgress.value = value;
  musicVolumeValue.textContent = value + '%';
  lofiJazz1.volume = value / 100;
  lofiJazz2.volume = value / 100;
  if (lofiJazz1.volume > 0) {
    musicIcon.classList.remove('icon-music-mute');
    settingsMusicIcon.classList.remove('icon-music-mute');
    musicStart(0);
  } else {
    musicIcon.classList.add('icon-music-mute');
    settingsMusicIcon.classList.add('icon-music-mute');
  }
}
function clickVolumeChange(value) {
  volumeProgress.value = value;
  clickVolumeValue.textContent = value + '%';
  soundArr.forEach((item) => {
    let sound = item;
    sound.volume = value / 100;
  });
  if (localStorage.getItem('clickVolume')) {
    localStorage.clickVolume = value;
  } else {
    localStorage.setItem('clickVolume', value);
  }
  if (clickSound1.volume > 0) {
    volumeIcon.classList.remove('icon-volume-mute');
    settingsVolumeIcon.classList.remove('icon-volume-mute');
  } else {
    volumeIcon.classList.add('icon-volume-mute');
    settingsVolumeIcon.classList.add('icon-volume-mute');
  }
}

function updateMusicInput(value) {
  musicProgress.value = value * 100;
  musicVolumeValue.textContent = value * 100 + '%';
}
function updateClickInput(value) {
  volumeProgress.value = value * 100;
  clickVolumeValue.textContent = value * 100 + '%';
}

if (localStorage.getItem('clickVolume')) {
  clickVolumeChange(localStorage.getItem('clickVolume'));
} else {
  clickVolumeChange(20);
}

musicProgress.addEventListener('input', () => {
  musicVolumeChange(musicProgress.value);
});
volumeProgress.addEventListener('input', () => {
  clickVolumeChange(volumeProgress.value);
});

musicBtn.addEventListener('click', () => {
  if (musicIcon.classList.contains('icon-music-mute')) {
    audioVolumeToggle();
    updateMusicInput(0);
  } else {
    audioVolumeToggle();
    updateMusicInput(musicPrevVolume);
  }
});
volumeBtn.addEventListener('click', () => {
  if (volumeIcon.classList.contains('icon-volume-mute')) {
    audioVolumeToggle();
    updateClickInput(0);
  } else {
    audioVolumeToggle();
    updateClickInput(clickPrevVolume);
  }
});
settingsMusicBtn.addEventListener('click', () => {
  if (settingsMusicIcon.classList.contains('icon-music-mute')) {
    audioVolumeToggle();
    updateMusicInput(0);
  } else {
    audioVolumeToggle();
    updateMusicInput(musicPrevVolume);
  }
});
settingsVolumeBtn.addEventListener('click', () => {
  if (settingsVolumeIcon.classList.contains('icon-volume-mute')) {
    audioVolumeToggle();
    updateClickInput(0);
  } else {
    audioVolumeToggle();
    updateClickInput(clickPrevVolume);
  }
});

let resetProgressBtn = document.querySelector('#settings-clear-progress');
let resetProgressBlock = document.querySelector('.reset-confirmation');
resetProgressBtn.addEventListener('click', () => {
  resetProgressBlock.classList.add('reset-confirmation-active');
});

function resetAllProgress() {
  for (let i = 1; i <= 12; i++) {
    if (localStorage.getItem(`artistsStage${i}Score`)) {
      localStorage.removeItem(`artistsStage${i}Score`);
    }
    for (let t = 1; t <= 12; t++) {
      if (localStorage.getItem(`artistsStage${i}Lvl${t}Answer`)) {
        localStorage.removeItem(`artistsStage${i}Lvl${t}Answer`);
      }
    }
  }
  for (let i = 1; i <= 12; i++) {
    if (localStorage.getItem(`picturesStage${i}Score`)) {
      localStorage.removeItem(`picturesStage${i}Score`);
    }
    for (let t = 1; t <= 12; t++) {
      if (localStorage.getItem(`picturesStage${i}Lvl${t}Answer`)) {
        localStorage.removeItem(`picturesStage${i}Lvl${t}Answer`);
      }
    }
  }

  location.reload();
}

let resetConfirmationYes = document.querySelector('#confirm-yes');
let resetConfirmationNo = document.querySelector('#confirm-no');

resetConfirmationYes.addEventListener('click', () => {
  resetAllProgress();
  resetProgressBlock.classList.remove('reset-confirmation-active');
});
resetConfirmationNo.addEventListener('click', () => {
  resetProgressBlock.classList.remove('reset-confirmation-active');
});
