/// Translation operations on Shows
/// Dispatch class defined by RESTSpec in App.API.ShowTranslation.spec
Class App.API.ShowTranslation.disp Extends %CSP.REST [ GeneratedBy = App.API.ShowTranslation.spec.cls, ProcedureBlock ]
{

/// The class containing the RESTSpec which generated this class
Parameter SpecificationClass = "App.API.ShowTranslation.spec";

/// Ignore any writes done directly by the REST method.
Parameter IgnoreWrites = 1;

/// By default convert the input stream to Unicode
Parameter CONVERTINPUTSTREAM = 1;

/// The default response charset is utf-8
Parameter CHARSET = "utf-8";

Parameter HandleCorsRequest = 1;

XData UrlMap [ XMLNamespace = "http://www.intersystems.com/urlmap" ]
{
<Routes>
  <!-- translate a Show description -->
  <Route Url="/show/:showId" Method="get" Call="translateShow" />
</Routes>
}

/// translate a Show description
ClassMethod translateShow(pshowId As %String) As %Status
{
    Try {
        Do ##class(%REST.Impl).%SetContentType("application/json")
        If '##class(%REST.Impl).%CheckAccepts("application/json") Do ##class(%REST.Impl).%ReportRESTError(..#HTTP406NOTACCEPTABLE,$$$ERROR($$$RESTBadAccepts)) Quit
        If ($number(pshowId,"I")="") Do ##class(%REST.Impl).%ReportRESTError(..#HTTP400BADREQUEST,$$$ERROR($$$RESTInvalid,"showId",pshowId)) Quit
        Set response=##class(App.API.ShowTranslation.impl).translateShow(pshowId)
        Do ##class(App.API.ShowTranslation.impl).%WriteResponse(response)
    } Catch (ex) {
        Do ##class(%REST.Impl).%ReportRESTError(..#HTTP500INTERNALSERVERERROR,ex.AsStatus(),$parameter("App.API.ShowTranslation.impl","ExposeServerExceptions"))
    }
    Quit $$$OK
}

}
