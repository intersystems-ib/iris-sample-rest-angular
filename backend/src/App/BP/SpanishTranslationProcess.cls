/// Spanish - Google Translation
Class App.BP.SpanishTranslationProcess Extends Ens.BusinessProcessBPL
{

/// BPL Definition
XData BPL [ XMLNamespace = "http://www.intersystems.com/bpl" ]
{
<process language='objectscript' request='Ens.StringRequest' response='Ens.StringResponse' height='2000' width='2000' >
<context>
<property name='show' type='App.Data.Show' instantiate='0' />
</context>
<sequence xend='200' yend='450' >
<call name='Google Translate' target='Google Translate API' async='1' xpos='200' ypos='250' >
<annotation><![CDATA[Call Google Translator API]]></annotation>
<request type='App.Msg.GoogleTranslateReq' >
<assign property="callrequest.text" value="request.StringValue" action="set" />
<assign property="callrequest.lang" value="&quot;es&quot;" action="set" />
</request>
<response type='App.Msg.GoogleTranslateRsp' >
<assign property="response.StringValue" value="callresponse.translatedText" action="set" />
</response>
</call>
<sync name='Wait call' calls='Google Translate' type='all' xpos='200' ypos='350' >
<annotation><![CDATA[Wait for response]]></annotation>
</sync>
</sequence>
</process>
}

Storage Default
{
<Type>%Storage.Persistent</Type>
}

}
