console.log("Fragments page script loaded!");

const skillNodes = {
    1: 0,
    2: 30,
    3: 65,
    4: 105,
    5: 150,
    6: 200,
    7: 255,
    8: 315,
    9: 380,
    10: 580,
    11: 660,
    12: 750,
    13: 850,
    14: 960,
    15: 1080,
    16: 1210,
    17: 1350,
    18: 1500,
    19: 1660,
    20: 2010,
    21: 2180,
    22: 2360,
    23: 2550,
    24: 2750,
    25: 2960,
    26: 3180,
    27: 3410,
    28: 3650,
    29: 3900,
    30: 4400,
};

const masteryNode = {
    1: 50,
    2: 65,
    3: 83,
    4: 103,
    5: 126,
    6: 151,
    7: 179,
    8: 209,
    9: 242,
    10: 342,
    11: 382,
    12: 427,
    13: 477,
    14: 532,
    15: 592,
    16: 657,
    17: 727,
    18: 802,
    19: 882,
    20: 1057,
    21: 1142,
    22: 1232,
    23: 1327,
    24: 1427,
    25: 1532,
    26: 1642,
    27: 1757,
    28: 1877,
    29: 2002,
    30: 2252,
  };
  
  const boostNode = {
    1: 75,
    2: 98,
    3: 125,
    4: 155,
    5: 189,
    6: 227,
    7: 269,
    8: 314,
    9: 363,
    10: 513,
    11: 573,
    12: 641,
    13: 716,
    14: 799,
    15: 889,
    16: 987,
    17: 1092,
    18: 1205,
    19: 1325,
    20: 1588,
    21: 1716,
    22: 1851,
    23: 1994,
    24: 2144,
    25: 2302,
    26: 2467,
    27: 2640,
    28: 2820,
    29: 3008,
    30: 3383,
  };
  
  const commonNode = {
    1: 125,
    2: 163,
    3: 207,
    4: 257,
    5: 314,
    6: 377,
    7: 446,
    8: 521,
    9: 603,
    10: 903,
    11: 1013,
    12: 1137,
    13: 1275,
    14: 1427,
    15: 1592,
    16: 1771,
    17: 1964,
    18: 2171,
    19: 2391,
    20: 2916,
    21: 3150,
    22: 3398,
    23: 3660,
    24: 3935,
    25: 4224,
    26: 4527,
    27: 4844,
    28: 5174,
    29: 5518,
    30: 6268,
  };
  
  

document.getElementById("calc-1").addEventListener("click", () => {
  const level1 = parseInt(document.getElementById("level1-1").value);
  const level2 = parseInt(document.getElementById("level1-2").value);
  if (level1 < 1 || level1 > 30 || level2 < 1 || level2 > 30) {
    document.getElementById("result-1").innerHTML =
      "Error: Levels must be between 1 and 30";
  } else {
    const score1 = skillNodes[level1];
    const score2 = skillNodes[level2];
    const difference = Math.abs(score2 - score1);
    document.getElementById(
      "result-1"
    ).innerHTML = `The difference is: ${difference}`;
  }
});
document.getElementById("calc-2").addEventListener("click", () => {
  const level1 = parseInt(document.getElementById("level2-1").value);
  const level2 = parseInt(document.getElementById("level2-2").value);
  if (level1 < 1 || level1 > 30 || level2 < 1 || level2 > 30) {
    document.getElementById("result-1").innerHTML =
      "Error: Levels must be between 1 and 30";
  } else {
    const score1 = masteryNode[level1];
    const score2 = masteryNode[level2];
    const difference = Math.abs(score2 - score1);
    document.getElementById(
      "result-2"
    ).innerHTML = `The difference is: ${difference}`;
  }
});

document.getElementById("calc-3").addEventListener("click", () => {
  const level1 = parseInt(document.getElementById("level3-1").value);
  const level2 = parseInt(document.getElementById("level3-2").value);
  if (level1 < 1 || level1 > 30 || level2 < 1 || level2 > 30) {
    document.getElementById("result-1").innerHTML =
      "Error: Levels must be between 1 and 30";
  } else {
    const score1 = boostNode[level1];
    const score2 = boostNode[level2];
    const difference = Math.abs(score2 - score1);
    document.getElementById(
      "result-3"
    ).innerHTML = `The difference is: ${difference}`;
  }
});

document.getElementById("calc-4").addEventListener("click", () => {
  const level1 = parseInt(document.getElementById("level4-1").value);
  const level2 = parseInt(document.getElementById("level4-2").value);
  if (level1 < 1 || level1 > 30 || level2 < 1 || level2 > 30) {
    document.getElementById("result-1").innerHTML =
      "Error: Levels must be between 1 and 30";
  } else {
    const score1 = commonNode[level1];
    const score2 = commonNode[level2];
    const difference = Math.abs(score2 - score1);
    document.getElementById(
      "result-4"
    ).innerHTML = `The difference is: ${difference}`;
  }
});
