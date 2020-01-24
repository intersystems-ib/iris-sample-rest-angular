Class App.Prod Extends Ens.Production
{

XData ProductionDefinition
{
<Production Name="App.Prod" LogGeneralTraceEvents="false">
  <Description></Description>
  <ActorPoolSize>2</ActorPoolSize>
  <Item Name="Netflix CSV File" Category="" ClassName="EnsLib.RecordMap.Service.FileService" PoolSize="1" Enabled="true" Foreground="false" Comment="" LogTraceEvents="false" Schedule="">
    <Setting Target="Adapter" Name="ArchivePath">/opt/myapp/data/archived</Setting>
    <Setting Target="Adapter" Name="FilePath">/opt/myapp/data/input</Setting>
    <Setting Target="Adapter" Name="FileSpec">*.csv</Setting>
    <Setting Target="Host" Name="RecordMap">App.RecordMap.NetflixCSV</Setting>
    <Setting Target="Host" Name="TargetConfigNames">Record Router</Setting>
    <Setting Target="Adapter" Name="Charset">utf-8</Setting>
  </Item>
  <Item Name="CSVRecord To Data" Category="" ClassName="App.BO.CSVRecordToData" PoolSize="1" Enabled="true" Foreground="false" Comment="" LogTraceEvents="false" Schedule="">
  </Item>
  <Item Name="Record Router" Category="" ClassName="EnsLib.MsgRouter.RoutingEngine" PoolSize="1" Enabled="true" Foreground="false" Comment="" LogTraceEvents="false" Schedule="">
    <Setting Target="Host" Name="BusinessRuleName">App.Rule.RecordRouter</Setting>
  </Item>
</Production>
}

}
