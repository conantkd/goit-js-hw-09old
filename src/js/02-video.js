import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo(document.getElementById('vimeo-player'));
const key = 'videoplayer-current-time';

const saveTimeToLocalStorage = seconds => {
  localStorage.setItem(key, seconds);
};

const throttledSaveTime = throttle(saveTimeToLocalStorage, 1000);

player.on('timeupdate', data => {
  throttledSaveTime(data.seconds);
});

const savedTime = parseInt(localStorage.getItem(key), 10);

if (!isNaN(savedTime)) {
  player.setCurrentTime(savedTime);
}
