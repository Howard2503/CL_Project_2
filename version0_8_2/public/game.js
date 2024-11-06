// game.js

// Client-side (game.js)
const socket = io();

// Create a basic deck of Mahjong tiles (simplified for demo purposes)
let tiles = [
  '1万 1 character', '2万 2 character', '3万 3 character', '4万 4 character', '5万 5 character', '6万 6 character', '7万 7 character', '8万 8 character', '9万 9 character',
  '1筒 1 dot', '2筒 2 dot', '3筒 3 dot', '4筒 4 dot', '5筒 5 dot', '6筒 6 dot', '7筒 7 dot', '8筒 dot', '9筒 dot',
  '1条 1 bamboo', '2条 2 bamboo', '3 条 3 bamboo', '4 条 4 bamboo', '5条 5 bamboo', '6条 6 bamboo', '7条 7 bamboo', '8条 8 bamboo', '9条 9 bamboo',
  '1万 1 character', '2万 2 character', '3万 3 character', '4万 4 character', '5万 5 character', '6万 6 character', '7万 7 character', '8万 8 character', '9万 9 character',
  '1筒 1 dot', '2筒 2 dot', '3筒 3 dot', '4筒 4 dot', '5筒 5 dot', '6筒 6 dot', '7筒 7 dot', '8筒 dot', '9筒 dot',
  '1条 1 bamboo', '2条 2 bamboo', '3 条 3 bamboo', '4 条 4 bamboo', '5条 5 bamboo', '6条 6 bamboo', '7条 7 bamboo', '8条 8 bamboo', '9条 9 bamboo',
  '1万 1 character', '2万 2 character', '3万 3 character', '4万 4 character', '5万 5 character', '6万 6 character', '7万 7 character', '8万 8 character', '9万 9 character',
  '1筒 1 dot', '2筒 2 dot', '3筒 3 dot', '4筒 4 dot', '5筒 5 dot', '6筒 6 dot', '7筒 7 dot', '8筒 dot', '9筒 dot',
  '1条 1 bamboo', '2条 2 bamboo', '3 条 3 bamboo', '4 条 4 bamboo', '5条 5 bamboo', '6条 6 bamboo', '7条 7 bamboo', '8条 8 bamboo', '9条 9 bamboo',
  '1万 1 character', '2万 2 character', '3万 3 character', '4万 4 character', '5万 5 character', '6万 6 character', '7万 7 character', '8万 8 character', '9万 9 character',
  '1筒 1 dot', '2筒 2 dot', '3筒 3 dot', '4筒 4 dot', '5筒 5 dot', '6筒 6 dot', '7筒 7 dot', '8筒 dot', '9筒 dot',
  '1条 1 bamboo', '2条 2 bamboo', '3 条 3 bamboo', '4 条 4 bamboo', '5条 5 bamboo', '6条 6 bamboo', '7条 7 bamboo', '8条 8 bamboo', '9条 9 bamboo',

];

// Shuffle the tiles
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Player's hand and AI players' hands
let playerHand = [];
let opponent1Hand = [];
let opponent2Hand = [];
let opponent3Hand = [];
let playerHasDrawn = false; // Track if player has drawn a tile
let opponentsVisible = false; // Track if opponents' hands are visible
let gameEnded = false; // Track if the game has ended

// Additional arrays to keep track of discarded tiles for each player
let playerDiscarded = [];
let opponent1Discarded = [];
let opponent2Discarded = [];
let opponent3Discarded = [];




// Draw a tile from the deck
function drawTile() {
  return tiles.pop();
}

window.onload = function () {
  var playButton = document.getElementById("play-button");

  // var startMusicButton = document.getElementById("start-music");

  var music = document.getElementById("background-music");

  startMusicButton.addEventListener("click", function () {
    music.play().then(() => {
      console.log("Music is playing");
    }).catch(error => {
      console.log("Error playing music: ", error);
    });
  });


  // Code for playing music after user interaction
  // document.getElementById("start-game").addEventListener("click", function () {
  //   document.getElementById("start-overlay").style.display = "none"; // Remove the overlay
  //   var music = document.getElementById("background-music");
  //   music.play().then(() => {
  //     console.log("Music is playing");
  //   }).catch(error => {
  //     console.log("Error playing music: ", error);
  //   });
  // });

  // playButton.addEventListener("click", function () {
  //   music.play().then(() => {
  //     console.log("Music is playing");
  //   }).catch(error => {
  //     console.log("Error playing music: ", error);
  //   });
  // });


  document.getElementById("start-game").addEventListener("click", function () {
    document.getElementById("start-overlay").style.display = "none"; // Remove overlay
    var music = document.getElementById("background-music");
    music.play().then(() => {
      console.log("Music is playing");
    }).catch(error => {
      console.log("Error playing music: ", error);
    });
  });
};




// Initialize the game by giving each player 13 tiles
function initializeGame() {
  tiles = [
    '1万 1 character', '2万 2 character', '3万 3 character', '4万 4 character', '5万 5 character', '6万 6 character', '7万 7 character', '8万 8 character', '9万 9 character',
    '1筒 1 dot', '2筒 2 dot', '3筒 3 dot', '4筒 4 dot', '5筒 5 dot', '6筒 6 dot', '7筒 7 dot', '8筒 dot', '9筒 dot',
    '1条 1 bamboo', '2条 2 bamboo', '3 条 3 bamboo', '4 条 4 bamboo', '5条 5 bamboo', '6条 6 bamboo', '7条 7 bamboo', '8条 8 bamboo', '9条 9 bamboo',
    '1万 1 character', '2万 2 character', '3万 3 character', '4万 4 character', '5万 5 character', '6万 6 character', '7万 7 character', '8万 8 character', '9万 9 character',
    '1筒 1 dot', '2筒 2 dot', '3筒 3 dot', '4筒 4 dot', '5筒 5 dot', '6筒 6 dot', '7筒 7 dot', '8筒 dot', '9筒 dot',
    '1条 1 bamboo', '2条 2 bamboo', '3 条 3 bamboo', '4 条 4 bamboo', '5条 5 bamboo', '6条 6 bamboo', '7条 7 bamboo', '8条 8 bamboo', '9条 9 bamboo',
    '1万 1 character', '2万 2 character', '3万 3 character', '4万 4 character', '5万 5 character', '6万 6 character', '7万 7 character', '8万 8 character', '9万 9 character',
    '1筒 1 dot', '2筒 2 dot', '3筒 3 dot', '4筒 4 dot', '5筒 5 dot', '6筒 6 dot', '7筒 7 dot', '8筒 dot', '9筒 dot',
    '1条 1 bamboo', '2条 2 bamboo', '3 条 3 bamboo', '4 条 4 bamboo', '5条 5 bamboo', '6条 6 bamboo', '7条 7 bamboo', '8条 8 bamboo', '9条 9 bamboo',
    '1万 1 character', '2万 2 character', '3万 3 character', '4万 4 character', '5万 5 character', '6万 6 character', '7万 7 character', '8万 8 character', '9万 9 character',
    '1筒 1 dot', '2筒 2 dot', '3筒 3 dot', '4筒 4 dot', '5筒 5 dot', '6筒 6 dot', '7筒 7 dot', '8筒 dot', '9筒 dot',
    '1条 1 bamboo', '2条 2 bamboo', '3 条 3 bamboo', '4 条 4 bamboo', '5条 5 bamboo', '6条 6 bamboo', '7条 7 bamboo', '8条 8 bamboo', '9条 9 bamboo',
  ]; // Reset tiles for a new game
  shuffle(tiles);
  playerHand = [];
  opponent1Hand = [];
  opponent2Hand = [];
  opponent3Hand = [];

  for (let i = 0; i < 13; i++) {
    playerHand.push(drawTile());
    opponent1Hand.push(drawTile());
    opponent2Hand.push(drawTile());
    opponent3Hand.push(drawTile());
  }
  sortHands(); // Sort all hands after initialization
  renderPlayerHand();
  playerHasDrawn = false; // Reset the state
  renderOpponentsHands(); // Render opponents' hands
  updateRemainingTiles(); // Display the initial remaining tiles
  gameEnded = false; // Reset game status
  toggleGameControls(); // Enable game controls
}

// Render the player's hand on the screen
function renderPlayerHand() {
  const playerHandDiv = document.getElementById('player-hand');
  playerHandDiv.innerHTML = ''; // Clear previous hand
  playerHand.forEach((tile, index) => {
    const tileDiv = document.createElement('div');
    tileDiv.classList.add('tile');
    tileDiv.textContent = tile;
    tileDiv.addEventListener('click', () => discardTile(index));
    playerHandDiv.appendChild(tileDiv);
  });
}

// Render the opponents' hands on the screen
function renderOpponentsHands() {
  const opponent1HandDiv = document.getElementById('opponent1-hand');
  const opponent2HandDiv = document.getElementById('opponent2-hand');
  const opponent3HandDiv = document.getElementById('opponent3-hand');

  if (opponentsVisible) {
    opponent1HandDiv.textContent = `Opponent 1 电脑1: ${opponent1Hand.join(', ')}`;
    opponent2HandDiv.textContent = `Opponent 2 电脑2: ${opponent2Hand.join(', ')}`;
    opponent3HandDiv.textContent = `Opponent 3 电脑3: ${opponent3Hand.join(', ')}`;
  } else {
    opponent1HandDiv.textContent = 'Opponent 1 电脑1: Hidden';
    opponent2HandDiv.textContent = 'Opponent 2 电脑2: Hidden';
    opponent3HandDiv.textContent = 'Opponent 3 电脑3: Hidden';
  }
}

// Update the number of remaining tiles
function updateRemainingTiles() {
  const remainingTilesDiv = document.getElementById('remaining-tiles');
  remainingTilesDiv.textContent = `Remaining Tiles 剩余手牌: ${tiles.length}`;

  // Check if the game should end
  if (tiles.length === 0) {
    endGame();
  }
}


function endGame() {
  gameEnded = true; // Set game status to ended
  alert("游戏结束！The game is over! No more tiles left.");
  toggleGameControls(); // Disable game controls
}

// Toggle game controls (enabled/disabled)
function toggleGameControls() {
  const drawButton = document.getElementById('draw-tile');
  drawButton.disabled = gameEnded; // Disable draw button if game is over
  const opponentButton = document.getElementById('toggle-opponents');
  opponentButton.disabled = gameEnded; // Disable opponent button if game is over
}

// Discard a tile from the player's hand
function discardTile(tileIndex) {
  console.log('discardTile function called'); // Check if this function is triggered
  if (!playerHasDrawn) {
    alert("先出牌！You must draw a tile before discarding!");
    return;
  }

  const discardSound = document.getElementById('discard-sound');
  discardSound.play();
  discardSound.volume = 1;
  console.log('Playing discard sound');

  playerHand.splice(tileIndex, 1); // Remove the tile
  playerHasDrawn = false; // Reset so player must draw again
  sortHands(); // Sort all hands after discard
  renderPlayerHand(); // Re-render the player's hand

  // Opponents draw and discard
  opponentsDrawAndDiscard();
}

// Opponents draw a new tile and discard one
function opponentsDrawAndDiscard() {
  drawTileForOpponent(opponent1Hand);
  drawTileForOpponent(opponent2Hand);
  drawTileForOpponent(opponent3Hand);
  sortHands(); // Sort all hands after opponents' actions
  renderOpponentsHands(); // Update opponents' hands display
}

// Draw a new tile for the opponent and discard one
function drawTileForOpponent(opponentHand) {
  if (tiles.length > 0) {
    const newTile = drawTile();
    opponentHand.push(newTile); // Add new tile to opponent's hand
    console.log(`Opponent drew: ${newTile}`);
    opponentHand.sort(() => Math.random() - 0.5); // Randomly discard one tile for simplicity
    opponentHand.pop(); // Discard the last tile (this is just a placeholder logic)
  }
}

// Sort the hands based on tile order (group by suit, then by rank)
function sortHands() {
  const sortingOrder = { '万': 0, '筒': 1, '条': 2 }; // Define the order of suits
  const sortFunction = (a, b) => {
    const [rankA, suitA] = [parseInt(a[0]), a[1]];
    const [rankB, suitB] = [parseInt(b[0]), b[1]];
    return sortingOrder[suitA] - sortingOrder[suitB] || rankA - rankB;
  };

  playerHand.sort(sortFunction);
  opponent1Hand.sort(sortFunction);
  opponent2Hand.sort(sortFunction);
  opponent3Hand.sort(sortFunction);
}

// Player draws a new tile and must discard afterward
// function drawTileForPlayer() {
//   if (playerHasDrawn) {
//     alert(" 先出牌！You must discard a tile before drawing a new one!");
//     return;
//   }
//   const newTile = drawTile();
//   playerHand.push(newTile);
//   console.log(`Player drew: ${newTile}`);
//   renderPlayerHand();
//   playerHasDrawn = true; // Set the state to true so the player can discard
//   updateRemainingTiles(); // Update the remaining tile count
// }

// Emit a draw event
function drawTileForPlayer() {
  if (playerHasDrawn) {
    alert("先出牌！You must discard a tile before drawing a new one!");
    return;
  }
  const newTile = drawTile();
  playerHand.push(newTile);
  // console.log(`Player drew: ${newTile}`);
  renderPlayerHand();
  playerHasDrawn = true;
  updateRemainingTiles();

  // Emit drawTile event to server
  socket.emit('drawTile', { player: 'Player', tile: newTile });
}

// Listen for tileDrawn event
socket.on('tileDrawn', (data) => {
  console.log(`${data.player} drew a tile: ${data.tile}`);
  // Optionally update UI to reflect the tile drawn by another player
});

// Listen for other players' draw and discard events
socket.on('playerDrewTile', (data) => {
  console.log(`${data.player} drew a tile`);
  // Update UI or game state to show that another player drew
});

socket.on('playerDiscardedTile', (data) => {
  console.log(`${data.player} discarded: ${data.tile}`);
  // Update UI to show discarded tile from another player
});

// Toggle opponents' hands visibility
function toggleOpponentsHands() {
  opponentsVisible = !opponentsVisible; // Toggle the visibility state
  renderOpponentsHands(); // Update the display
}

// Restart the game
function restartGame() {
  // Reset hands and discarded arrays
  playerDiscarded = [];
  opponent1Discarded = [];
  opponent2Discarded = [];
  opponent3Discarded = [];

  renderPlayerDiscarded(); // Update the discarded tiles display
  renderOpponentsDiscarded()

  // Opponents draw and discard
  // opponentsDrawAndDiscard();

  initializeGame(); // Reinitialize the game
}

// Initialize the game when the page loads
window.onload = () => {
  initializeGame();

  // Draw tile button
  document.getElementById('draw-tile').addEventListener('click', () => {
    drawTileForPlayer();
  });

  // Toggle opponents' hands button
  document.getElementById('toggle-opponents').addEventListener('click', () => {
    toggleOpponentsHands();
  });

  // Restart game button
  document.getElementById('restart-game').addEventListener('click', () => {
    restartGame();
  });
};

// Render the discarded tiles for the player
function renderPlayerDiscarded() {
  const playerDiscardedDiv = document.getElementById('player-discarded');
  playerDiscardedDiv.innerHTML = `玩家已打出 The player has discarded: ${playerDiscarded.join(', ')}`;
}

// Render the discarded tiles for the opponents
function renderOpponentsDiscarded() {
  const opponent1DiscardedDiv = document.getElementById('opponent1-discarded');
  const opponent2DiscardedDiv = document.getElementById('opponent2-discarded');
  const opponent3DiscardedDiv = document.getElementById('opponent3-discarded');

  opponent1DiscardedDiv.innerHTML = `电脑一号已打出 Opponent 1 has discarded: ${opponent1Discarded.join(', ')}`;
  opponent2DiscardedDiv.innerHTML = `电脑二号已打出 Opponent 2 has discarded: ${opponent2Discarded.join(', ')}`;
  opponent3DiscardedDiv.innerHTML = `电脑三号已打出 Opponent 3 has discarded: ${opponent3Discarded.join(', ')}`;
}

// Update the discard logic in discardTile function
function discardTile(tileIndex) {
  if (!playerHasDrawn) {
    alert("先摸牌！You must draw a tile before discarding!");
    return;
  }
  const discardedTile = playerHand.splice(tileIndex, 1)[0]; // Remove the tile
  playerDiscarded.push(discardedTile); // Add to discarded
  playerHasDrawn = false; // Reset so player must draw again
  sortHands(); // Sort all hands after discard
  renderPlayerHand(); // Re-render the player's hand
  renderPlayerDiscarded(); // Update the discarded tiles display

  // Emit discardTile event to server
  socket.emit('discardTile', { player: 'Player', tile: discardedTile });

  // Opponents draw and discard
  opponentsDrawAndDiscard();
}

// Opponents draw a new tile and discard one, also update discarded tiles
function drawTileForOpponent(opponentHand, opponentDiscarded) {
  if (tiles.length > 0) {
    const newTile = drawTile();
    opponentHand.push(newTile); // Add new tile to opponent's hand
    console.log(`对手 Opponent drew: ${newTile}`);
    const discardedTile = opponentHand.pop(); // Randomly discard one tile
    opponentDiscarded.push(discardedTile); // Add to discarded tiles
  }
}



// Update the opponents' draw and discard logic
function opponentsDrawAndDiscard() {
  drawTileForOpponent(opponent1Hand, opponent1Discarded);
  drawTileForOpponent(opponent2Hand, opponent2Discarded);
  drawTileForOpponent(opponent3Hand, opponent3Discarded);
  sortHands(); // Sort all hands after opponents' actions
  renderOpponentsHands(); // Update opponents' hands display
  renderOpponentsDiscarded(); // Update opponents' discarded tiles display
}

// document.addEventListener("DOMContentLoaded", function () {
//   var music = document.getElementById("background-music");
//   music.play().then(() => {
//     console.log("Music is playing");
//   }).catch(error => {
//     console.error("Error playing music:", error);
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("start-overlay");
  const startButton = document.getElementById("start-game");
  const music = document.getElementById("background-music");

  startButton.addEventListener("click", function () {
    overlay.style.display = "none"; // Hide the overlay
    music.play().then(() => {
      console.log("Music is playing");
    }).catch(error => {
      console.error("Error playing music:", error);
    });
  });
});

// Chat functionality
// document.getElementById("send-chat").addEventListener("click", function() {
//   const message = document.getElementById("chat-input").value;
//   socket.emit('chatMessage', message);
//   document.getElementById("chat-input").value = ''; // Clear input field
// });

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("send-chat").addEventListener("click", function() {
      const message = document.getElementById("chat-input").value;
      socket.emit('chatMessage', message);
      document.getElementById("chat-input").value = ''; // Clear input field
  });
});

socket.on('receiveChatMessage', (message) => {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv); // Append message to chat box
});
