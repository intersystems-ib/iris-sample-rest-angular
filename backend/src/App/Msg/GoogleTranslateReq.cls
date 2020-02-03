Class App.Msg.GoogleTranslateReq Extends Ens.Request
{

Property text As %String(MAXLEN = "");

Property lang As %String;

Storage Default
{
<Data name="GoogleTranslateReqDefaultData">
<Subscript>"GoogleTranslateReq"</Subscript>
<Value name="1">
<Value>text</Value>
</Value>
<Value name="2">
<Value>lang</Value>
</Value>
</Data>
<DefaultData>GoogleTranslateReqDefaultData</DefaultData>
<Type>%Storage.Persistent</Type>
}

}
