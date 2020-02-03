/// 
/// Cast of a Show
Class App.Data.Cast Extends (%Persistent, Form.Adaptor)
{

Parameter FORMNAME = "Cast";

Parameter OBJPERMISSIONS As %String = "CRUD";

Parameter DISPLAYPROPERTY As %String = "name";

Parameter FORMORDERBY As %String = "name";

/// id of the cast (internal). Calculated using internal %Id()
Property id As %Integer(%JSONINCLUDE = "OUTPUTONLY") [ Calculated, SqlComputeCode = { set {*}={%%ID}}, SqlComputed ];

/// name of the cast
Property name As %String(MAXLEN = "");

/// actingRole (this property is not included in the DataSet)
Property actingRole As %String(MAXLEN = "");

/// show where the cast has appeared 
Relationship show As App.Data.Show(%JSONINCLUDE = "INOUT", %JSONREFERENCE = "ID") [ Cardinality = one, Inverse = cast ];

Index showIndex On show;

/// 
/// This classmethod is used in the RESTForms2 query /form/objects/App.Data.Cast/find
ClassMethod queryFIND() As %String
{
  quit "id, name, actingRole "
}

Storage Default
{
<Data name="CastDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>name</Value>
</Value>
<Value name="3">
<Value>actingRole</Value>
</Value>
<Value name="4">
<Value>show</Value>
</Value>
</Data>
<DataLocation>^App.Data.CastD</DataLocation>
<DefaultData>CastDefaultData</DefaultData>
<IdLocation>^App.Data.CastD</IdLocation>
<IndexLocation>^App.Data.CastI</IndexLocation>
<StreamLocation>^App.Data.CastS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
