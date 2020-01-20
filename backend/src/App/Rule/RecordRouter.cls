/// 
Class App.Rule.RecordRouter Extends Ens.Rule.Definition
{

Parameter RuleAssistClass = "EnsLib.MsgRouter.RuleAssist";

XData RuleDefinition [ XMLNamespace = "http://www.intersystems.com/rule" ]
{
<ruleDefinition alias="" context="EnsLib.MsgRouter.RoutingEngine" production="App.Prod">
<ruleSet name="" effectiveBegin="" effectiveEnd="">
<rule name="">
<constraint name="msgClass" value="App.RecordMap.NetflixCSV.Record"></constraint>
<when condition="Document.releaseyear&gt;1960">
<send transform="" target="CSVRecord To Data"></send>
<return></return>
</when>
</rule>
</ruleSet>
</ruleDefinition>
}

}
