let outterRadius = 150;
let innerRadius = 100;

let outterCircles = 9;
let innerCircles = 7;

let outterStep = 180 / (outterCircles - 1);
let innerStep = 180 / (innerCircles - 1);

let numberOfMaps = 13;
let mapMargin = 100;

let table;
let labels;

const colorMap = {
  '--': '#CECECE',
  'Viola 1': '#E7C448',
  'Viola 2': '#7BA657',
  'Viola 3': '#5683C3',
  'Viola 4': '#634FA3',
  'Viola 5': '#FF4D00'
};

function preload() {
  table = loadTable('https://docs.google.com/spreadsheets/d/e/2PACX-1vQwnDGk01_8Bgd-IidsLsgm2AUnaBuAjhnrBCKFAlXCkc709TtWrTTpo48dDhjbsleBPPdkLZbuH5pw/pub?gid=0&single=true&output=csv', 'csv', 'header');
}

function setup() {
  createCanvas(1080, 1920);
  labels = table.columns.slice(1); // Skip the 'Música' column
}

function draw() {
  background(255);

  let cols = floor((width - mapMargin) / (outterRadius * 2 + mapMargin));
  let rows = ceil(numberOfMaps / cols);

  let gridWidth = cols * (outterRadius * 2 + mapMargin) - mapMargin;
  let gridHeight = rows * (outterRadius * 2 + mapMargin) - mapMargin;

  if (gridWidth > width || gridHeight > height) {
    scaleFactor = min(width / gridWidth, height / gridHeight);
    outterRadius *= scaleFactor;
    innerRadius *= scaleFactor;
    outterStep = 180 / (outterCircles - 1);
    innerStep = 180 / (innerCircles - 1);

    cols = floor((width - mapMargin) / (outterRadius * 2 + mapMargin));
    rows = ceil(numberOfMaps / cols);

    gridWidth = cols * (outterRadius * 2 + mapMargin) - mapMargin;
    gridHeight = rows * (outterRadius * 2 + mapMargin) - mapMargin;
  }

  translate((width - gridWidth) / 2 + outterRadius, (height - gridHeight) / 2 + outterRadius);

  for (let i = 0; i < numberOfMaps; i++) {
    let x = (i % cols) * (outterRadius * 2 + mapMargin);
    let y = floor(i / cols) * (outterRadius * 2 + mapMargin);

    tuneMap(x, y, i);
  }
}

function tuneMap(x, y, mapIndex) {
  push();
  translate(x, y);

  let row = table.getRow(mapIndex);

  // draw title
  let title = row.getString('Música');
  fill(0);
  textSize(24 * scaleFactor);
  textAlign(CENTER, CENTER);
  text(title, 0, -outterRadius - 80 * scaleFactor);

  // draw outer circles
  for (let angle = 0; angle >= -180; angle -= outterStep) {
    let index = (180 + angle) / outterStep + 1; // Skip the 'Música' column
    let category = row.getString(index);
    let color = colorMap[category];
    fill(color);
    let cx = cos(radians(angle)) * outterRadius;
    let cy = sin(radians(angle)) * outterRadius;
    ellipse(cx, cy, 45 * scaleFactor);
    fill(0);
    textSize(22 * scaleFactor);
    textAlign(CENTER, CENTER);
    text(labels[index - 1], cx, cy);
  }

  // draw inner circles
  for (let angle = 0; angle >= -180; angle -= innerStep) {
    let index = (180 + angle) / innerStep + outterCircles + 1; // Skip the 'Música' column
    let category = row.getString(index);
    let color = colorMap[category];
    fill(color);
    let cx = cos(radians(angle)) * innerRadius;
    let cy = sin(radians(angle)) * innerRadius;
    ellipse(cx, cy, 45 * scaleFactor);
    fill(0);
    textSize(22 * scaleFactor);
    textAlign(CENTER, CENTER);
    text(labels[index - 1], cx, cy);
  }
  pop();
}