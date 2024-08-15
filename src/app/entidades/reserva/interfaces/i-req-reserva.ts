import { ILog } from "../../../my-shared/interfaces-shared/i-log";
import { ILinksReserva } from "./i-links-reserva";

export interface IReqReserva {
  id:number,
  restaurante: string;
  quarto: number;
  nome: string;
  paxadulto: number;
  paxcrianca: number;
  hora: string;
  hoster: string;
  datareserva: string;
  observacao: string;
  horaentrada: string

}
