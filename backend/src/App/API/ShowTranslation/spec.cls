Class App.API.ShowTranslation.spec Extends %REST.Spec [ ProcedureBlock ]
{

XData OpenAPI [ MimeType = application/json ]
{
{
  "swagger":"2.0",
  "info":{
    "description":"Translation operations on Shows",
    "version":"1.0.0",
    "title":"Show Translation"
  },
  "paths":{
    "/show/{showId}":{
      "get":{
        "summary":"translate a Show description",
        "operationId":"translateShow",
        "description":"translates Show descriptions and updates object",
        "consumes":[
          "application/json"
        ],
        "produces":[
          "application/json"
        ],
        "parameters":[
          {
            "in":"path",
            "name":"showId",
            "description":"Show id to translate",
            "required":true,
            "type":"integer"
          }
        ],
        "responses":{
          "200":{
            "description":"Show description translated",
            "schema":{
              "$ref":"#/definitions/Show"
            }
          },
          "404":{
            "description":"Show not found"
          },
          "500":{
            "description":"error"
          }
        }
      }
    }
  },
  "definitions":{
    "Show":{
      "type":"object",
      "required":[
        "id"
      ],
      "properties":{
        "id":{
          "type":"integer",
          "example":449931
        },
        "title":{
          "type":"string",
          "example":"Doctor Zhivago"
        },
        "description":{
          "type":"string",
          "example":"A young physician and his beautiful mistress get swept up in the danger and drama of the Bolshevik Revolution in this Oscar-winning epic film."
        },
        "translatedDescription":{
          "type":"string",
          "example":"Un joven médico y su bella amante se ven envueltos en el peligro y el drama de la Revolución Bolchevique en esta película épica ganadora del Oscar."
        }
      }
    }
  },
  "basePath":"/myapp/api/translation",
  "schemes":[
    "http"
  ]
}
}

}
