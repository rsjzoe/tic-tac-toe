import { Rond } from "./rond";
import { X } from "./x";

export class Player {
  private pion: Rond | X;

  constructor(p: Rond | X, private numero: number) {
    this.pion = p;
  }

  afficher() {
    const PlayerContainer = document.querySelector(".player-container")!;
    PlayerContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="player">
            <p>player ${this.numero} :</p>
            <div class="carrer">
                ${this.pion.getHTML()}
            </div>
        </div>
        `
    );
    
  }
  
  getPion(){
    return this.pion
  }
}
