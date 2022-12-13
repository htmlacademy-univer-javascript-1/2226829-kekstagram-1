const sizeNumber = document.querySelector('.scale__control--value');
const sizePlus = document.querySelector('.scale__control--bigger');
const sizeMinus = document.querySelector('.scale__control--smaller');

const photoPreview = document.querySelector('.img-upload__preview');

const MIN_SIZE = 25;
const MAX_SIZE = 100;
const DEFAULT_SIZE = 50;
const STEP = 25;

const renderScale = () => {
  sizePlus.addEventListener('click', () => {
    let value;
    if (sizeNumber.value.length > 3) {
      value = Number(sizeNumber.value.substring(0, 3));
    } else {
      value = Number(sizeNumber.value.substring(0, 2));
    }
    if (value < MAX_SIZE) {
      value += STEP;
      photoPreview.style.transform = `scale(${value / 100})`;
      sizeNumber.value = `${value}%`;
    }
  });

  sizeMinus.addEventListener('click', () => {
    let value;
    if (sizeNumber.value.length > 3) {
      value = Number(sizeNumber.value.substring(0, 3));
    } else {
      value = Number(sizeNumber.value.substring(0, 2));
    }
    if (value > MIN_SIZE) {
      value -= STEP;
      photoPreview.style.transform = `scale(${value / 100})`;
      sizeNumber.value = `${value}%`;
    }
  });
};

const resetScale = () => {
  photoPreview.style.transform = `scale(${DEFAULT_SIZE / 100})`;
  sizeNumber.value = `${DEFAULT_SIZE}%`;
};

export {renderScale,resetScale};
