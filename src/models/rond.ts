import { Pion } from "./pion";

export class Rond implements Pion {
  getHTML() {
    return `<span class="round"></span>`;
  }
}
