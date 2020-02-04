/// Translation operations on Shows<br/>
/// Business logic class defined by OpenAPI in App.API.ShowTranslation.spec<br/>
/// Updated Feb 4, 2020 09:34:15
Class App.API.ShowTranslation.impl Extends (%REST.Impl, Ens.BusinessService) [ ProcedureBlock ]
{

/// If ExposeServerExceptions is true, then details of internal errors will be exposed.
Parameter ExposeServerExceptions = 0;

/// translates Show descriptions and updates object<br/>
/// The method arguments hold values for:<br/>
///     showId, Show id to translate<br/>
ClassMethod translateShow(showId As %Integer) As %DynamicObject
{
    set ret = $$$OK
    try {
        // open Show object
        set show = ##class(App.Data.Show).%OpenId(showId)
        
        // error if Show not found
        if '$isobject(show) {
            do ..%SetStatusCode(404)
            return ""
        }
        
        // call interopebility Business Process
        set sc = ##class(Ens.Director).CreateBusinessService("Show Translation API",.service)
        $$$ThrowOnError(sc)

        // build translation request
        set req = ##class(Ens.StringRequest).%New()
        set req.StringValue = show.description
        
        // send translation request
        set sc = service.SendRequestSync("Spanish Translation Process", req, .rsp)
        $$$ThrowOnError(sc)

        // handle response - store translation
        set show.translatedDescription = rsp.StringValue
        $$$ThrowOnError(show.%Save())

        // return object
        do show.%JSONExportToString(.json)
        return json

    } catch ex {
        set ret = ex.AsStatus()
        do ..%SetStatusCode(500)
    }
    quit ret
}

}
