

ng new webapp --directory=frontend --routing=true --skipGit --style=scss
ng add @angular/material

ng generate module shared
ng generate module shows --routing

ng generate component shows/show-latest
ng generate service shows/services/shows

ng generate component shows/cast-list
ng generate component shows/show-list
ng generate component shows/show-edit-dialog
ng generate component shows/cast-edit-dialog

ng generate module auth --routing
ng generate component auth/login
ng generate component auth/logout
ng generate service auth/services/auth