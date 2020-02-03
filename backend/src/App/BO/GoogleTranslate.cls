Class App.BO.GoogleTranslate Extends EnsLib.REST.Operation
{

Parameter INVOCATION = "Queue";

/// Google Cloud Credentials (API key)
Property GoogleCloudCredentials As %String;

/// These are the production settings for this object
Parameter SETTINGS = "GoogleCloudCredentials:Basic:credentialsSelector";

Method translate(pRequest As App.Msg.GoogleTranslateReq, Output pResponse As App.Msg.GoogleTranslateRsp) As %Status
{
    set ret = $$$OK
    try {
        set pResponse = ##class(App.Msg.GoogleTranslateRsp).%New()

        // retrieve credentials
        set sc = ##class(Ens.Config.Credentials).GetCredentialsObj(.credObj, $classname(), "Ens.Config.Credentials", ..GoogleCloudCredentials)
        $$$ThrowOnError(sc)

        // request URL
        set url = ..Adapter.URL_"?key="_credObj.Password
        
        // request body
        set body = { 
            "q": [(pRequest.text)],
            "source": "en",
            "target": (pRequest.lang)
        }

        // send POST request
        set sc = ..Adapter.PostURL(url, .httpRsp, "", body.%ToJSON())
		if $$$ISERR(sc),$isobject(httpRsp),$isobject(httpRsp.Data),httpRsp.Data.Size {
            return $$$ERROR($$$EnsErrGeneral,$$$StatusDisplayString(sc)_":"_httpRsp.Data.Read())
        }
        $$$ThrowOnError(sc)
        
        // handle response
        if $isobject(httpRsp) {
            // instantiate response in json dynamic object
            set jsonRsp = {}.%FromJSON(httpRsp.Data.Read())
            // get first translation
            set pResponse.translatedText = jsonRsp.data.translations.%Get(0).translatedText
        }

   } catch ex {
       set ret = ex.AsStatus()
   }
   quit ret
}

XData MessageMap
{
<MapItems>
  <MapItem MessageType="App.Msg.GoogleTranslateReq">
    <Method>translate</Method>
  </MapItem>
</MapItems>
}

}
