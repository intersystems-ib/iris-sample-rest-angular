Class App.Data.Cast Extends (%Persistent, Form.Adaptor)
{

Parameter FORMNAME = "Cast";

Parameter OBJPERMISSIONS As %String = "CRUD";

Parameter DISPLAYPROPERTY As %String = "name";

Parameter FORMORDERBY As %String = "name";

Property id As %Integer(%JSONINCLUDE = "OUTPUTONLY") [ Calculated, SqlComputeCode = { set {*}={%%ID}}, SqlComputed ];

Property name As %String(MAXLEN = "");

Property role As %String(MAXLEN = "");

Relationship show As App.Data.Show(%JSONINCLUDE = "INOUT", %JSONREFERENCE = "ID") [ Cardinality = one, Inverse = cast ];

Index showIndex On show;

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
<Value>role</Value>
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
