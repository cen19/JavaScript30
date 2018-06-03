const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = function() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  }).then(
    localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(
      err => console.error('oh no!!!', err
    )
  );
};

const paintToCanvas = function() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // change them
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 32);
};

const takePhoto = function() {
  snap.currentTime = 0;
  snap.play();

  // take data out of canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="HandsomeMang" />`;
  strip.insertBefore(link, strip.firstChild);
};

const redEffect = function(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100;
    pixels.data[i + 1] = pixels.data[i + 1] - 50;
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
  }
  return pixels;
};


const rgbSplit = function(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0] + 100;
    pixels.data[i + 100] = pixels.data[i + 1] - 50;
    pixels.data[i - 150] = pixels.data[i + 2] * 0.5;
  }
  return pixels;
};

const greenScreen = function(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0] + 100;
    pixels.data[i + 100] = pixels.data[i + 1] - 50;
    pixels.data[i - 150] = pixels.data[i + 2] * 0.5;
  }
  return pixels;
};

getVideo();

video.addEventListener('canplay', paintToCanvas);