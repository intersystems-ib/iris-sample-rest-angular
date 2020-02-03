Class App.Msg.GoogleTranslateRsp Extends Ens.Response
{

Property translatedText As %String(MAXLEN = "");

Storage Default
{
<Data name="GoogleTranslateRspDefaultData">
<Subscript>"GoogleTranslateRsp"</Subscript>
<Value name="1">
<Value>translatedText</Value>
</Value>
</Data>
<DefaultData>GoogleTranslateRspDefaultData</DefaultData>
<Type>%Storage.Persistent</Type>
}

}
