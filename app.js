window.onload = function() {
  var num;
  var box;
  var ctx;
  var turn = 1;
  var filled;
  var symbol;
  var winner;
  var gameOver = false;

  filled = [false, false, false, false, false, false, false, false, false];
  symbol = ["", "", "", "", "", "", "", "", ""];
  winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  //clear the canvas when button is clicked
  var n = document.getElementById("new");
  n.addEventListener("click", newGame);

  function newGame() {
    document.location.reload();
  }

  //canvas click + retrieving the box's number
  document.getElementById("tic").addEventListener("click", function(e) {
    boxClick(e.target.id);
  });

  function boxClick(numId) {
    box = document.getElementById(numId);
    ctx = box.getContext("2d");

    switch (numId) {
      case "square1":
        num = 1;
        break;
      case "square2":
        num = 2;
        break;
      case "square3":
        num = 3;
        break;
      case "square4":
        num = 4;
        break;
      case "square5":
        num = 5;
        break;
      case "square6":
        num = 6;
        break;
      case "square7":
        num = 7;
        break;
      case "square8":
        num = 8;
        break;
      case "square9":
        num = 9;
        break;
    }

    //drawing the shapes on the canvases (switch to 0 indexing later)
    if (filled[num - 1] == false) {
      if (gameOver == false) {
        if (turn % 2 != 0) {
          var sean_image = new Image();
          sean_image.src = "sean.png";
          sean_image.onload = function() {
            ctx.drawImage(sean_image, -43, -26);
          };

          symbol[num - 1] = "ZED";
        } else {
          //if number is even (O player)
          var square_svg = new Image();
          square_svg.src = "square.svg";
          square_svg.onload = function() {
            ctx.drawImage(square_svg, 8.5, 8.5);
          };

          symbol[num - 1] = "SQUARE";
        }
        turn++;
        filled[num - 1] = true; //square has been filled

        var s = symbol[num - 1]; //holds current canvas' symbol
        for (var i = 0; i < winner.length; i++) {
          if (
            symbol[winner[i][0]] == s &&
            symbol[winner[i][1]] == s &&
            symbol[winner[i][2]] == s
          ) {
            document.getElementById("result").innerText = s + " WINS!";
            gameOver = true;
            document.getElementById("undo").disabled = true;
          }
        }
        //tie game
        if (turn > 9 && gameOver == false) {
          document.getElementById("result").innerText = "TIE GAME!";
          document.getElementById("undo").disabled = true;
        }

        //undo the last move made
        document.getElementById("undo").onclick = function() {
          ctx.clearRect(0, 0, box.width, box.height);
          filled[num - 1] = false;
          symbol[num - 1] = "";
          turn--;
        };
      } else {
      }
    } else {
    }
  }
};
