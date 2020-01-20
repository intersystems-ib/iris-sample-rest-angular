Class App.Data.Show Extends (%Persistent, Form.Adaptor)
{

Parameter FORMNAME = "Show";

Parameter OBJPERMISSIONS As %String = "CRUD";

Parameter DISPLAYPROPERTY As %String = "title";

Parameter FORMORDERBY As %String = "title";

Property showid As %Integer(%JSONFIELDNAME = "id", %JSONINCLUDE = "OUTPUTONLY");

Index showidIdx On showid [ IdKey, PrimaryKey, Unique ];

Property title As %String(MAXLEN = "");

Property description As %String(MAXLEN = "");

Relationship cast As App.Data.Cast(%JSONREFERENCE = "ID") [ Cardinality = many, Inverse = show ];

ClassMethod queryFIND() As %String
{
  quit "showid id, title, description "
}

Storage Default
{
<Data name="ShowDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>title</Value>
</Value>
<Value name="3">
<Value>description</Value>
</Value>
</Data>
<DataLocation>^App.Data.ShowD</DataLocation>
<DefaultData>ShowDefaultData</DefaultData>
<IdLocation>^App.Data.ShowD</IdLocation>
<IndexLocation>^App.Data.ShowI</IndexLocation>
<StreamLocation>^App.Data.ShowS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
