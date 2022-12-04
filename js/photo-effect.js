import {EFFECTS,EFFECT_OPTIONS} from './data.js';

const DEFAULT_EFFECT = 'none';

const photoPreview = document.querySelector('.img-upload__preview');

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsInputs = document.querySelectorAll('.effects__radio');
const effectLevel = document.querySelector('.img-upload__effect-level');

export const renderSlider = () => {
  effectLevel.classList.add('hidden');
  let activeFilter = 'none';

  noUiSlider.create(
    sliderElement, {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
    }
  );

  sliderElement.noUiSlider.on('update', () => {
    effectLevelValue.value = parseFloat(sliderElement.noUiSlider.get()).toFixed(1);
    if (activeFilter !== DEFAULT_EFFECT) {
      photoPreview.style.filter = EFFECT_OPTIONS[activeFilter]['filter'](sliderElement.noUiSlider.get());
    }
  });

  effectsInputs.forEach((input) => {
    input.addEventListener('change', () => {
      EFFECTS.forEach((effect) => {
        if (photoPreview.classList.contains(effect)) {
          photoPreview.classList.remove(effect);
        }
      });
      activeFilter = input.value;
      input.checked = true;
      photoPreview.classList.add(`effects_preview--${activeFilter}`);
      photoPreview.style.filter = '';
      if (activeFilter === DEFAULT_EFFECT) {
        effectLevel.classList.add('hidden');
      } else {
        effectLevel.classList.remove('hidden');
        sliderElement.noUiSlider.updateOptions(EFFECT_OPTIONS[activeFilter].noui);
      }
      photoPreview.style.filter = '';

    });
  });
};
