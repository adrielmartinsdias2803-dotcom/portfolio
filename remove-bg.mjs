import { Jimp } from 'jimp';

const img = await Jimp.read('trajetoria-personagens-original.png');
const { width, height } = img.bitmap;
const data = img.bitmap.data;

function getIdx(x, y) { return (y * width + x) * 4; }

function colorDistance(x, y, targetR, targetG, targetB) {
  const i = getIdx(x, y);
  const r = data[i], g = data[i+1], b = data[i+2];
  return Math.sqrt(
    Math.pow(r - targetR, 2) +
    Math.pow(g - targetG, 2) +
    Math.pow(b - targetB, 2)
  );
}

// Pega a cor do canto superior esquerdo como cor de referência do fundo
const bgIdx = getIdx(0, 0);
const bgR = data[bgIdx], bgG = data[bgIdx+1], bgB = data[bgIdx+2];
console.log(`Cor do fundo detectada: rgb(${bgR}, ${bgG}, ${bgB})`);

const THRESHOLD = 40; // Tolerância de cor

const visited = new Uint8Array(width * height);
const isBackground = new Uint8Array(width * height);

const queue = [];

// Semeia nas 4 bordas
for (let x = 0; x < width; x++) {
  if (colorDistance(x, 0, bgR, bgG, bgB) < THRESHOLD) queue.push(x * width + 0);
  if (colorDistance(x, height-1, bgR, bgG, bgB) < THRESHOLD) queue.push(x + (height-1) * width);
}
for (let y = 1; y < height-1; y++) {
  if (colorDistance(0, y, bgR, bgG, bgB) < THRESHOLD) queue.push(y * width);
  if (colorDistance(width-1, y, bgR, bgG, bgB) < THRESHOLD) queue.push((width-1) + y * width);
}

const dx = [1, -1, 0, 0, 1, -1, 1, -1]; // 8 direções
const dy = [0, 0, 1, -1, 1, -1, -1, 1];

while (queue.length > 0) {
  const pos = queue.pop();
  if (visited[pos]) continue;
  visited[pos] = 1;
  isBackground[pos] = 1;

  const x = pos % width;
  const y = Math.floor(pos / width);

  for (let d = 0; d < 8; d++) {
    const nx = x + dx[d], ny = y + dy[d];
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const npos = ny * width + nx;
      if (!visited[npos] && colorDistance(nx, ny, bgR, bgG, bgB) < THRESHOLD) {
        queue.push(npos);
      }
    }
  }
}

// Aplica transparência com suavização de bordas
img.scan(0, 0, width, height, function(x, y, idx) {
  const pos = y * width + x;
  if (isBackground[pos]) {
    // Verifica se está na borda do sujeito para suavizar
    let hasSubjectNeighbor = false;
    for (let d = 0; d < 4; d++) {
      const nx = x + dx[d], ny = y + dy[d];
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        if (!isBackground[ny * width + nx]) { hasSubjectNeighbor = true; break; }
      }
    }
    // Pixel de borda: semi-transparente para suavizar
    this.bitmap.data[idx + 3] = hasSubjectNeighbor ? 80 : 0;
  }
});

await img.write('trajetoria-personagens.png');
console.log('Concluído! Fundo removido com flood-fill 8-direcional e suavização de bordas.');
