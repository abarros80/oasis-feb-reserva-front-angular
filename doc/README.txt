> ng -v

------------------------------------

FrontOffice em Angular - Software Gestão das reservas dos restaurantes
DATA INICIO: 19/07/2024

How To Fix Error PS1 Can Not Be Loaded Because Running Scripts Is Disabled On This System In Angular

Step 1
set-ExecutionPolicy RemoteSigned -Scope CurrentUser

Step 2
Get-ExecutionPolicy

Step 3
Get-ExecutionPolicy -list

MachinePolicy Undefined
UserPolicy Undefined
Process Undefined
CurrentUser RemoteSigned
LocalMachine Undefined



> ng new oasis-feb-reserva-front
> cd oasis-feb-reserva-front

> ng add @angular/material
> npm install bootstrap bootstrap-icons

> ng serve --open --port=4201 --host=0.0.0.0

npm start (v17)


Open the angular.json file

            "styles": [
              "node_modules/bootstrap/scss/bootstrap.scss",
              "node_modules/bootstrap-icons/font/bootstrap-icons.css",
              "src/styles.scss"
            ],
            "scripts": [
              "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
            ]


ng-bootstrap | Angular |	Bootstrap CSS | Popper
16.x.x 	     | ^17.0.0 |	5.3.2 	      |  ^2.11.8



_____________________________________________________CRIAR PASTA:
PASTAS:

entidades
my-core
  services
  guards
my-share
  components-shared
  interfaces-shared
settings
_____________________________________________________END PASTAS


_____________________________________________________PARTILHADO - COMPONENTES/SERVICES/MODELS/INTERFACES
COMPONENTES:

ng g c my-shared/components-shared/pagina-nao-encontrado --skip-tests
ng g c my-shared/components-shared/dialogo-confirmacao --skip-tests

SERVICES:
ng g service my-core/services/api-crud --skip-tests
ng g service my-core/services/http-interceptor --skip-tests ******
ng g service my-core/services/login --skip-tests
_____________________________________________________END PARTILHADO


_____________________________________________________N PARTILHADO - COMPONENTES/SERVICES/MODELS/INTERFACES:
ADMIN:
ng g c admin --skip-tests
ng g c admin/components/header --skip-tests
ng g c admin/components/footer --skip-tests
ng g c admin/components/menu-top --skip-tests
ng g c admin/components/main --skip-tests
ng g c admin/components/login --skip-tests
ng g c admin/components/menu-left --skip-tests

GUEST:
ng g c guest --skip-tests
ng g c guest/components/header --skip-tests
ng g c guest/components/footer --skip-tests
ng g c guest/components/menu-top --skip-tests
ng g c guest/components/main --skip-tests
ng g c guest/components/menu-left --skip-tests

____________________________________________________ENTIDADES:

RESERVA:-------------------------------------------------------------------------------
CRUD:
ng g c entidades/reserva --skip-tests
Criar ficheiro entidades/reserva/reserva.routes.ts
ng g c entidades/reserva/components/main-menu --skip-tests
ng g c entidades/reserva/components/crud/listar --skip-tests
ng g c entidades/reserva/components/crud/apagar --skip-tests
ng g c entidades/reserva/components/crud/criar-alterar --skip-tests
ng g c entidades/reserva/components/crud/detalhe --skip-tests

MODEL:
ng g cl entidades/reserva/models/m-reserva --skip-tests

SERVICE:
ng generate service entidades/reserva/services/reserva-crud --skip-tests

INTERFACE:
ng g i entidades/reserva/interfaces/i-response-pageable-reserva
ng g i entidades/reserva/interfaces/i-reserva

USER:-------------------------------------------------------------------------------
CRUD:
ng g c entidades/user --skip-tests
