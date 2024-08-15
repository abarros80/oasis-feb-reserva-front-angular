const QUARTOS:  {id:number, nome:string}[] = [];
const RESTAURANTE:  {id:string, nome:string}[] = [{id:"Tabanka", nome:"Tabanka"}, {id:"Tradicao", nome:"Tradicao"}];
const HORARIOS:  {id:string, nome:string}[] = [{id:"19:30",nome:"19:30"},{id:"20:30",nome:"20:30"}];
const NUMADULTOS:  number[] = [0,1,2,3,4,5,6,7,8,9,10];
const NUMCRIANCAS:  number[] = [0,1,2,3,4,5,6,7,8,9,10];



let y=0;
for (let i = 101; i <= 141; i++) {
  QUARTOS[y] = {id:i, nome:i+""};
  y++;
}

export const appsettings = {
  API: 'http://localhost:8080/feb-api/',
  quartos: QUARTOS,
  restaurantes: RESTAURANTE,
  horas: HORARIOS,
  numadultos: NUMADULTOS,
  numcriancas: NUMCRIANCAS
};



