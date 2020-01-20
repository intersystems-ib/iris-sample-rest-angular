/// RECORDMAP: Generated from RecordMap 'App.RecordMap.NetflixCSV'
/// on 2020-01-20 at 15:54:15.979 [2020-01-20 15:54:15.979 UTC]
/// by user SuperUser
Class App.RecordMap.NetflixCSV.Record Extends (%Persistent, %XML.Adaptor, Ens.Request, EnsLib.RecordMap.Base) [ Inheritance = right, ProcedureBlock ]
{

Parameter INCLUDETOPFIELDS = 1;

Property showid As %String;

Property title As %String(MAXLEN = "");

Property director As %String(MAXLEN = "");

Property cast As %String(MAXLEN = "");

Property country As %String(MAXLEN = "");

Property dateadded As %String(MAXLEN = "");

Property releaseyear As %String(MAXLEN = "");

Property rating As %String(MAXLEN = "");

Property duration As %String(MAXLEN = "");

Property listedin As %String(MAXLEN = "");

Property description As %String(MAXLEN = "");

Property type As %String(MAXLEN = "");

Parameter RECORDMAPGENERATED = 1;

Storage Default
{
<Data name="RecordDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>showid</Value>
</Value>
<Value name="3">
<Value>%Source</Value>
</Value>
<Value name="4">
<Value>director</Value>
</Value>
<Value name="5">
<Value>cast</Value>
</Value>
<Value name="6">
<Value>country</Value>
</Value>
<Value name="7">
<Value>dateadded</Value>
</Value>
<Value name="8">
<Value>releaseyear</Value>
</Value>
<Value name="9">
<Value>rating</Value>
</Value>
<Value name="10">
<Value>duration</Value>
</Value>
<Value name="11">
<Value>listedin</Value>
</Value>
<Value name="12">
<Value>description</Value>
</Value>
<Value name="13">
<Value>type</Value>
</Value>
<Value name="14">
<Value>title</Value>
</Value>
</Data>
<DataLocation>^App.RecordMap.Netfl2E83.RecordD</DataLocation>
<DefaultData>RecordDefaultData</DefaultData>
<ExtentSize>2000000</ExtentSize>
<IdLocation>^App.RecordMap.Netfl2E83.RecordD</IdLocation>
<IndexLocation>^App.RecordMap.Netfl2E83.RecordI</IndexLocation>
<StreamLocation>^App.RecordMap.Netfl2E83.RecordS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
