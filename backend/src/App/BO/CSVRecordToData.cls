Class App.BO.CSVRecordToData Extends Ens.BusinessOperation
{

Parameter INVOCATION = "Queue";

Method CSVRecordToData(pRequest As App.RecordMap.NetflixCSV.Record, Output pResponse As Ens.Response) As %Status
{
	set ret = $$$OK
	try {
		set showid = +$zstrip(pRequest.showid, "<>WC")

		set show = ##class(App.Data.Show).%OpenId(showid)
		if '$isobject(show) {
			set show = ##class(App.Data.Show).%New()
			set show.showid = showid
		}

		set show.title = pRequest.title
		set show.description = pRequest.description

		if $isobject(show.cast) {
			$$$ThrowOnError(show.cast.Clear())
		} 

		set csvCasting = pRequest.cast
		for i=1:1:$length(csvCasting, ",") {
			set cast = ##class(App.Data.Cast).%New()
			set cast.name = $piece(csvCasting, ",", i)
			do show.cast.Insert(cast)
		} 
		
		$$$ThrowOnError(show.%Save(1))
	
	} catch ex {
		set ret = ex.AsStatus()
	} 
	quit ret
}

XData MessageMap
{
<MapItems>
	<MapItem MessageType="App.RecordMap.NetflixCSV.Record"> 
		<Method>CSVRecordToData</Method>
	</MapItem>
</MapItems>
}

}
