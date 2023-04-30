import { Component } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  winner : string = "";
  nextMove : boolean = false;

  grid : string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  private wins : number[][][] = [
    [
      [0, 0], 
      [0, 1], 
      [0, 2], 
    ],
    [
      [1, 0], 
      [1, 1], 
      [1, 2], 
    ],
    [
      [2, 0], 
      [2, 1], 
      [2, 2], 
    ],

    [
      [0, 0], 
      [1, 0], 
      [2, 0], 
    ],
    [
      [0, 1], 
      [1, 1], 
      [2, 1], 
    ],
    [
      [0, 2], 
      [1, 2], 
      [2, 2], 
    ],

    [
      [0, 0], 
      [1, 1], 
      [2, 2], 
    ],
    [
      [0, 2], 
      [1, 1], 
      [2, 0], 
    ]
  ]

  newGame() {
    this.grid = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];

    this.winner = "";
  }

  constructor() {}

  clicked(_x : number, _y : number) {
    // check if no winner
    if (this.winner) {
      return;
    }

    // check if already has been clicked
    if (this.grid[_x][_y] == "") {
      this.grid[_x][_y] = this.nextMove ? "X" : "O";
      this.nextMove = !this.nextMove;
    };

    // check win
    this.wins.forEach(_wins => {
      if (
        (
          this.grid[_wins[0][0]][_wins[0][1]] == "X" &&
          this.grid[_wins[1][0]][_wins[1][1]] == "X" &&
          this.grid[_wins[2][0]][_wins[2][1]] == "X"
        ) ||
        (
          this.grid[_wins[0][0]][_wins[0][1]] == "O"  &&
          this.grid[_wins[1][0]][_wins[1][1]] == "O"  &&
          this.grid[_wins[2][0]][_wins[2][1]] == "O" 
        )
      ) {
        this.winner = this.grid[_wins[0][0]][_wins[0][1]];
      }
    });

    // is tie ?
    let stillWay = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!this.grid[i][j]) {
          stillWay = true;
        }
      };
    };

    if (!stillWay)
      this.winner = "no winner";
  };
}
