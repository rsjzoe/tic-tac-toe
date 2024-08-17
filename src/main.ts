import { Player } from './models/player'
import { Rond } from './models/rond'
import { TableGame } from './models/tableGame'
import { X } from './models/x'
import './style.css'

const player1 = new Player(new X(), 1)
const player2 = new Player(new Rond(), 2)
const tableGame = new TableGame([player1, player2]) 

player1.afficher()
player2.afficher()
tableGame.affiche()
