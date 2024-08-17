import { Player } from "./player";
import { Rond } from "./rond";
import { X } from "./x";

export class TableGame {
  private table: (Rond | X | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  private players: Player[] = [];
  private currentIndexPlayer: number = 0;
  private gameOver = false;

  constructor(p: Player[]) {
    this.players = p;
    this.init();
  }

  init() {
    this.table = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.currentIndexPlayer = 0;
    this.gameOver = false;
    this.updateCurrentPlayer();
    const TableGame = document.querySelector(".table-game")!;
    TableGame.innerHTML = "";
  }

  updateCurrentPlayer() {
    const currentPlayer = document.querySelector(".currentPlayer")!;
    currentPlayer.innerHTML = this.players[this.currentIndexPlayer]
      .getPion()
      .getHTML();
  }

  affiche() {
    const TableGame = document.querySelector(".table-game")!;
    for (let i = 0; i < this.table.length; i++) {
      for (let j = 0; j < this.table[0].length; j++) {
        TableGame.insertAdjacentHTML(
          "beforeend",
          `
                    <div class="cellul c-${i}-${j} ${
            i == 2 ? "noborderb" : ""
          } ${j == 2 ? "noborderRight" : ""}"></div>
                `
        );
        const cellul = document.querySelector(`.c-${i}-${j}`) as HTMLDivElement;

        cellul.onclick = () => {
          if (this.table[i][j] == null && this.gameOver == false) {
            this.table[i][j] = this.players[this.currentIndexPlayer].getPion();
            cellul.innerHTML = this.players[this.currentIndexPlayer]
              .getPion()
              .getHTML();
            if (this.checkWinner()) {
              this.gameOver = true;
              this.modalWinner();
            }
            this.currentIndexPlayer = this.currentIndexPlayer == 0 ? 1 : 0;
            this.updateCurrentPlayer();
          }
        };
      }
    }
  }

  private checkWinner() {
    // Vérifie les lignes
    for (let i = 0; i < 3; i++) {
      if (
        this.table[i][0] &&
        this.table[i][0] === this.table[i][1] &&
        this.table[i][1] === this.table[i][2]
      ) {
        console.log("winner ligne");
        return true;
      }
    }

    // Vérifie les colonnes
    for (let i = 0; i < 3; i++) {
      if (
        this.table[0][i] &&
        this.table[0][i] === this.table[1][i] &&
        this.table[1][i] === this.table[2][i]
      ) {
        console.log("winner colonne");
        return true;
      }
    }

    // Vérifie la première diagonale
    if (
      this.table[0][0] &&
      this.table[0][0] === this.table[1][1] &&
      this.table[1][1] === this.table[2][2]
    ) {
      console.log("winner diagonal");
      return true;
    }

    // Vérifie la deuxième diagonale
    if (
      this.table[0][2] &&
      this.table[0][2] === this.table[1][1] &&
      this.table[1][1] === this.table[2][0]
    ) {
      console.log("winner contre diagonal");
      return true;
    }

    // Pas de gagnant
    return false;
  }

  modalWinner() {
    const modal = document.querySelector(".modal-container") as HTMLDivElement;
    const btn = document.querySelector("button")!;
    const playerWinner = document.querySelector(
      ".player-winner"
    ) as HTMLParagraphElement;
    modal.style.transform = "scale(1)";
    playerWinner.innerHTML = `player ${this.currentIndexPlayer + 1} win`;
    btn.onclick = () => {
      this.restart();
      modal.style.transform = "scale(0)";
    };
  }

  restart() {
    this.init();
    this.affiche()
  }
}
