# Angular app + InterSystems IRIS

This repository contains the code and instructions used during *REST APIs and Web Apps developing using IRIS* session in the [Iberia Summit 2020 (Spain)](https://www.intersystems.com/es/noticias-eventos/eventos/iberia-summit-barcelona-2020-18-y-19-de-febrero/)

<a href="https://www.intersystems.com/es/noticias-eventos/eventos/iberia-summit-barcelona-2020-18-y-19-de-febrero/"><img src="./img/summit2020.jpg" width=500></a>

# What will you learn?
We will develop a web application using the *Angular* framework and *InterSystems IRIS* as backend. We will expose persisted data in JSON format through REST APIs which could be fully implemented o generated automatically in IRIS.

This content is addressed to all those interested in *how to develop modern web applications* following the Single Page Application architecture leveraging all the features of the *InterSystems IRIS* data platform.

<img src="./img/iris-webapp.gif" width=500>

# What do you need to install? 
* [Git](https://git-scm.com/downloads) 
* [Docker](https://www.docker.com/products/docker-desktop)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [Visual Studio Code](https://code.visualstudio.com/download) + [InterSystems ObjectScript VSCode Extension](https://marketplace.visualstudio.com/items?itemName=daimor.vscode-objectscript)
* [Postman](https://www.getpostman.com/downloads/)

After that, you will be able to build the containers you need:
```console
$ git clone https://github.com/intersystems-ib/iris-dev-webapp
$ cd iris-dev-webapp
$ docker-compose build
```

# Start up the project
Run the following to get your containers started:
```
$ docker-compose up
```

After that, you should be able to get to: 
* *Backend* - InterSystems IRIS: http://localhost:52773/csp/sys/UtilHome.csp
* *Frontend* - Angular Web App: http://localhost:4200

# What are we developing?
* We'll start from a system capable of processing a *dataset* containing Netflix catalog information.
* This information will be stored in persistent clases in IRIS.
* Then we will expose this information in *JSON* format through *REST* interfaces, so it could be consumed from an *Angular* application.
* Finally, we will develop some new features into the web application.
<img src="./frontend/src/assets/img/iris-webapp-diagram.png" width=700>

# Backend
NOTE: use the default username and password: **superuser** / **SYS**

## Have a look at the NetFlix *dataset*
* In IRIS we already have a *production* responsible for processing the Netflix CSV *dataset*.
* Have a look at the production and the processed messages in [Interoperability](http://localhost:52773/csp/myapp/EnsPortal.ProductionConfig.zen?PRODUCTION=App.Prod).

## Explore the data using SQL / Objects / JSON
* Open the classes `App.Data.Show` and `App.Data.Cast` using VS Code. These classes use `%JSON.Adaptor` to export / import data in JSON format. You can find more information about that in the [JSON Enhacements](https://community.intersystems.com/post/json-enhancements) article.
* Run a SELECT on the `App_Data.Show` table using the [SQL Explorer](http://localhost:52773/csp/sys/exp/%25CSP.UI.Portal.SQL.Home.zen?$NAMESPACE=MYAPP)
* Explore the persistent objects with the loaded information using a [WebTerminal](http://localhost:52773/terminal/) session.
```objectscript
// open Show object
set show = ##class(App.Data.Show).%OpenId(449931)
// export to JSON
do show.%JSONExport()
```

## REST Interfaces
We have the Netflix *dataset* information stored and we are able to export / import the data from our persistent classes using `%JSON.Adaptor`.

How can we consume that information in JSON format from an Angular application? We will use REST interfaces. In our case, we have two options to implement that: 

### Developing a REST API
We can develop a REST API with the operations we need using a *OpenAPI* specification as starting point.

You can find more information about that in:
* Spanish Webinar - [Desarrollar y gestionar APIs con InterSystems IRIS](https://comunidadintersystems.com/desarrollar-y-gestionar-apis-con-intersystems-iris) and [full example](https://github.com/es-comunidad-intersystems/webinar-gestion-apis)
* Article - [Developing REST API with a spec-first approach](https://community.intersystems.com/post/developing-rest-api-spec-first-approach) article.

### Automatic generated REST APIs
[RESTForms2](https://openexchange.intersystems.com/package/RESTForms2) is an application that allow us to generate CRUD (Create, Read, Update, Delete) REST APIs automatically for our persistent classes. Even SQL queries are supported!

RESTForms2 is already installed in the *backend* container we are using and it's been enabled in the `App.Data.Show` y `App.Data.Cast` classes. So let's try it out:
* Open *Postman* and import the `backend/postman/MyApp.postman_collection.json` collection.
* Tests the different requests included in the collection.
<img src="./img/postman-restforms2.png" width=700>

We will use this automatically generated REST API to communicate the *frontend* and the *backend*. 

# Frontend
The *frontend* is a very simple *Angular 8* application that consumes REST interfaces from *backend*.

| Module | Description |
| --- | --- |
| App | General module of the application |
| AppRouting | Module responsible for handling the routes (URLs) used int he application |
| About | Contains the *about* component used as home page |
| Shared | Shared module which includes [Angular Material](https://material.angular.io) references |
| Auth | Basic authentication |
| Shows | Services and components that use `Show` and `Cast` *backend* data structures  |

We will have a closer look at the *Shows* module:

| Element | Description |
| --- | --- |
| `shows.model` | `Show` and `Cast` data structures used in the application |
| `shows.service` | Service that consumes *backend* interfaces. The components in this module will use this service. |
| `show-latest` | Component that displays `Shows` in a card layout  |
| `show-edit-dialog` | Component to edit a `Show` with a dialog  |
| `cast-list` | Component that displays the `Cast` of a `Show` in a table |
| `cast-edit-dialog` | Component to edit a `Cast` with a dialog |
| `show-list` | Component that displays all `Show` in a table. Pagination and search included |

Test the application! http://localhost:4200

## Feel like adding new features?
We can develop some new features as an exercise.

### Add a button to display Cast in *show-list*
Add a button to display the Cast of any show in the `show-list` table.

The `show-latest` component has this button already. We need to do the same thing in the `show-list` table. 

___
Add a new column definition in `show-list`. We will call this new column `actions` and we'll use it to contain the actions we want to perform on a table row.

Include the button to navegate to the `cast-list` component using the `Show` identifier.

> frontend/src/app/shows/show-list/show-list.component.html
```javascript
    <ng-container matColumnDef="actions">
      <mat-header-cell *matHeaderCellDef></mat-header-cell>
      <mat-cell *matCellDef="let show">
        <button mat-icon-button [routerLink]="['/shows/' + show.id + '/cast']" matTooltip="Casting">
          <mat-icon>people_alt</mat-icon>
        </button>
      </mat-cell>
    </ng-container>
```

___
The property `displayedColumns` in `show-list` is used to define the columns (and order) we want to display in the [mat-table](https://material.angular.io/components/table/overview). Include here our new `actions` column.

> frontend/src/app/shows/show-list/show-list.component.ts
```javascript
displayedColumns = ['actions', 'title', 'description'];
```


### Include "year" in every Show in the application
The IRIS *backend* has already included `year` as a property of `App.Data.Show`. However we are not using it the application. We are going to include this property in the web aplication.

___
Let's start by adding the `year` property to the data model we are using in Angular.

> frontend/src/app/shows/shows.model.ts
```javacript
export interface Show {
    id: number;
    name: string;
    description: string;
    year: string;
}
```

___
We also have to modify the `App.Data.Show:queryFIND` query in IRIS that we are using (through the automatically generated RESTForms2 API) to include the `year` property.

> backend/src/App/Data/Show.cls
```objectscript
ClassMethod queryFIND() As %String
{
  quit "showid id, title, year, description "
}
```

___
Now, we can display `year` in `show-latest` component:

> frontend/src/app/shows/show-latest/show-latest.component.html
```javascript
   <mat-card-header>
      <mat-card-title>{{show.title}} <small>{{ show.year }}</small></mat-card-title>
   </mat-card-header>
```

___
Let's also allow to edit the `year` property in `show-edit-dialog`.

> frontend/src/app/shows/show-edit-dialog/show-edit-dialog.component.ts
```javascript
    const formControls = {
      title: ['', Validators.required],
      description: ['', Validators.required],
      year: ['', Validators.required]
    };
```

> frontend/src/app/shows/show-edit-dialog/show-edit-dialog.component.html
```javascript
   <mat-form-field>
     <textarea matInput placeholder="Year" formControlName="year">
     </textarea>
   </mat-form-field>
```

___
Finally, we'll also display `year` a column in `show-list`. So like in the first exercise, we need to create a new column definition.

> frontend/src/app/shows/show-list/show-list.component.html
```javascript
    <ng-container matColumnDef="year">
      <mat-header-cell *matHeaderCellDef>Year</mat-header-cell>
      <mat-cell *matCellDef="let show">{{ show.year }}</mat-cell>
    </ng-container>
```

___
And we need to update the displayedColumns property too:

> frontend/src/app/shows/show-list/show-list.component.ts
```javascript
displayedColumns = ['actions', 'title', 'year', 'description'];
```
