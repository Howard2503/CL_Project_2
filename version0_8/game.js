// game.js

// Create a basic deck of Mahjong tiles (simplified for demo purposes)
let tiles = [
  '1万', '2万', '3万', '4万', '5万', '6万', '7万', '8万', '9万',
  '1筒', '2筒', '3筒', '4筒', '5筒', '6筒', '7筒', '8筒', '9筒',
  '1条', '2条', '3条', '4条', '5条', '6条', '7条', '8条', '9条',
  '1万', '2万', '3万', '4万', '5万', '6万', '7万', '8万', '9万',
  '1筒', '2筒', '3筒', '4筒', '5筒', '6筒', '7筒', '8筒', '9筒',
  '1条', '2条', '3条', '4条', '5条', '6条', '7条', '8条', '9条',
  '1万', '2万', '3万', '4万', '5万', '6万', '7万', '8万', '9万',
  '1筒', '2筒', '3筒', '4筒', '5筒', '6筒', '7筒', '8筒', '9筒',
  '1条', '2条', '3条', '4条', '5条', '6条', '7条', '8条', '9条',
  '1万', '2万', '3万', '4万', '5万', '6万', '7万', '8万', '9万',
  '1筒', '2筒', '3筒', '4筒', '5筒', '6筒', '7筒', '8筒', '9筒',
  '1条', '2条', '3条', '4条', '5条', '6条', '7条', '8条', '9条'
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

// Initialize the game by giving each player 13 tiles
function initializeGame() {
  tiles = [
    '1万', '2万', '3万', '4万', '5万', '6万', '7万', '8万', '9万',
    '1筒', '2筒', '3筒', '4筒', '5筒', '6筒', '7筒', '8筒', '9筒',
    '1条', '2条', '3条', '4条', '5条', '6条', '7条', '8条', '9条',
    '1万', '2万', '3万', '4万', '5万', '6万', '7万', '8万', '9万',
    '1筒', '2筒', '3筒', '4筒', '5筒', '6筒', '7筒', '8筒', '9筒',
    '1条', '2条', '3条', '4条', '5条', '6条', '7条', '8条', '9条',
    '1万', '2万', '3万', '4万', '5万', '6万', '7万', '8万', '9万',
    '1筒', '2筒', '3筒', '4筒', '5筒', '6筒', '7筒', '8筒', '9筒',
    '1条', '2条', '3条', '4条', '5条', '6条', '7条', '8条', '9条',
    '1万', '2万', '3万', '4万', '5万', '6万', '7万', '8万', '9万',
    '1筒', '2筒', '3筒', '4筒', '5筒', '6筒', '7筒', '8筒', '9筒',
    '1条', '2条', '3条', '4条', '5条', '6条', '7条', '8条', '9条'
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
    opponent1HandDiv.textContent = `Opponent 1: ${opponent1Hand.join(', ')}`;
    opponent2HandDiv.textContent = `Opponent 2: ${opponent2Hand.join(', ')}`;
    opponent3HandDiv.textContent = `Opponent 3: ${opponent3Hand.join(', ')}`;
  } else {
    opponent1HandDiv.textContent = 'Opponent 1: Hidden';
    opponent2HandDiv.textContent = 'Opponent 2: Hidden';
    opponent3HandDiv.textContent = 'Opponent 3: Hidden';
  }
}

// Update the number of remaining tiles
function updateRemainingTiles() {
  const remainingTilesDiv = document.getElementById('remaining-tiles');
  remainingTilesDiv.textContent = `Remaining Tiles: ${tiles.length}`;

  // Check if the game should end
  if (tiles.length === 0) {
    endGame();
  }
}

// End the game
function endGame() {
  gameEnded = true; // Set game status to ended
  alert("The game is over! No more tiles left.");
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
  if (!playerHasDrawn) {
    alert("You must draw a tile before discarding!");
    return;
  }
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
function drawTileForPlayer() {
  if (playerHasDrawn) {
    alert("You must discard a tile before drawing a new one!");
    return;
  }
  const newTile = drawTile();
  playerHand.push(newTile);
  console.log(`Player drew: ${newTile}`);
  renderPlayerHand();
  playerHasDrawn = true; // Set the state to true so the player can discard
  updateRemainingTiles(); // Update the remaining tile count
}

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
  playerDiscardedDiv.innerHTML = `玩家已打出: ${playerDiscarded.join(', ')}`;
}

// Render the discarded tiles for the opponents
function renderOpponentsDiscarded() {
  const opponent1DiscardedDiv = document.getElementById('opponent1-discarded');
  const opponent2DiscardedDiv = document.getElementById('opponent2-discarded');
  const opponent3DiscardedDiv = document.getElementById('opponent3-discarded');

  opponent1DiscardedDiv.innerHTML = `电脑一号已打出: ${opponent1Discarded.join(', ')}`;
  opponent2DiscardedDiv.innerHTML = `电脑二号已打出: ${opponent2Discarded.join(', ')}`;
  opponent3DiscardedDiv.innerHTML = `电脑三号已打出: ${opponent3Discarded.join(', ')}`;
}

// Update the discard logic in discardTile function
function discardTile(tileIndex) {
  if (!playerHasDrawn) {
    alert("You must draw a tile before discarding!");
    return;
  }
  const discardedTile = playerHand.splice(tileIndex, 1)[0]; // Remove the tile
  playerDiscarded.push(discardedTile); // Add to discarded
  playerHasDrawn = false; // Reset so player must draw again
  sortHands(); // Sort all hands after discard
  renderPlayerHand(); // Re-render the player's hand
  renderPlayerDiscarded(); // Update the discarded tiles display

  // Opponents draw and discard
  opponentsDrawAndDiscard();
}

// Opponents draw a new tile and discard one, also update discarded tiles
function drawTileForOpponent(opponentHand, opponentDiscarded) {
  if (tiles.length > 0) {
    const newTile = drawTile();
    opponentHand.push(newTile); // Add new tile to opponent's hand
    console.log(`Opponent drew: ${newTile}`);
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
