import { MyPages } from "../../../my-shared/interfaces-shared/my-pages";
import { IReserva } from "./i-reserva";

export interface IResponsePageableReserva {
  _embedded: { reservas: IReserva[]};
  _links: {
      self: { href: string ; };
      profile: { href: string ;};
      search: { href: string ; };
  };
  page: MyPages;
}
