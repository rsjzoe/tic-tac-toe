import { Pion } from "./pion";

export class X implements Pion{
    getHTML(): string {
        return `<span class="x"></span>`
    }
}