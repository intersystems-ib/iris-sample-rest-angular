/// 
/// Show
Class App.Data.Show Extends (%Persistent, Form.Adaptor)
{

Parameter FORMNAME = "Show";

Parameter OBJPERMISSIONS As %String = "CRUD";

Parameter DISPLAYPROPERTY As %String = "title";

Parameter FORMORDERBY As %String = "title";

/// showid - it is renamed to "id" when exported/imported from JSON
Property showid As %Integer(%JSONFIELDNAME = "id", %JSONINCLUDE = "OUTPUTONLY");

/// title of the show
Property title As %String(MAXLEN = "");

/// description
Property description As %String(MAXLEN = "");

/// year (we use %String datatype to allow expressions like "2013 - 2014")
Property year As %String;

/// description translated using Google Cloud Translation services
Property translatedDescription As %String(MAXLEN = "");

/// casting of the show (one to many)
Relationship cast As App.Data.Cast(%JSONREFERENCE = "ID") [ Cardinality = many, Inverse = show ];

Index showidIdx On showid [ IdKey, PrimaryKey, Unique ];

/// 
/// This classmethod is used in the RESTForms2 query /form/objects/App.Data.Show/find
ClassMethod queryFIND() As %String
{
  quit "showid id, title, year, description, translatedDescription "
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
<Value name="4">
<Value>year</Value>
</Value>
<Value name="5">
<Value>translatedDescription</Value>
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
