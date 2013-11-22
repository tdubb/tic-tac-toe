
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var winner = false;
var veg = 0;
var jun = 0;
var increase = function () {
  if (currentPlayer === player1)
    return veg += 1;
  else
    return jun += 1;
};

$('#title').hide();


var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
    

    // TODO: Check for rest of game winning cases
  )
  {
    console.log('somebody won');
    $(document).trigger('game-win', currentPlayer);
    winner = true;
    spaces = [
    NaN, NaN, NaN,
    NaN, NaN, NaN,
    NaN, NaN, NaN
    ];
    if (winner === true ) {
      alert('Game Over');
      $('#title').show();
      $('#board .space').removeClass('veggies');
      $('#board .space').removeClass('junkfood');
      $('#board .space').addClass('truthy');
      $('h3').hide(); 
      increase();
      $('#jun').text(jun);
      $('#veg').text(veg);

    }
    $('button').css("display", '');
    $('button').on("click", function () {
      var i = 0;
      $('#board .space').removeClass('truthy');
      $('#title').hide();
      $('h3').show();
      // setNextTurn();
    });
    
  }

};

$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);

  // Marks the space with the current player's name
  // TODO: Don't mark it unless the space is blank
 
 

  // Adds a class to elem so css can take care of the visuals
  
  if (spaces[spaceNum]) {
    alert('Choose another space');
  }
  else {
    spaces[spaceNum] = currentPlayer;
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
      
  }

  checkForWinner();
  setNextTurn();
  
});

$(document).on('game-win', function (e, winner) {
   alert(winner + " who won the game");
});

// Start the game

