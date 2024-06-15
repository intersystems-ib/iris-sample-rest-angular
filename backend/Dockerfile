ARG IMAGE=intersystemsdc/iris-community:latest
FROM $IMAGE

USER root
COPY irissession.sh /
RUN chown ${ISC_PACKAGE_MGRUSER}:${ISC_PACKAGE_IRISGROUP} /irissession.sh
RUN chmod u+x /irissession.sh
RUN mkdir -p /opt/myapp/db/DATA
RUN mkdir -p /opt/myapp/db/CODE
RUN mkdir -p /opt/myapp/data/input
RUN mkdir -p /opt/myapp/data/archived
RUN chown -R ${ISC_PACKAGE_MGRUSER}:${ISC_PACKAGE_IRISGROUP} /opt/myapp

USER irisowner

# download RESTForms2
# check RESTForms2 repo. it has zpm installation also available!
WORKDIR /tmp 
RUN wget https://github.com/intersystems-community/RESTForms2/archive/master.tar.gz
RUN tar -zxvf master.tar.gz
WORKDIR /tmp/RESTForms2-master

# copy dataset
WORKDIR /opt/myapp/data
COPY ./data/netflix.csv.gz .
RUN gunzip netflix.csv.gz
RUN cp netflix.csv input/

# copy myapp source code
WORKDIR /app
COPY src src
COPY data data

# download zpm package manager
RUN mkdir -p /tmp/deps \
 && cd /tmp/deps \
 && wget -q https://pm.community.intersystems.com/packages/zpm/latest/installer -O zpm.xml

SHELL ["/irissession.sh"]
RUN \
  # install RESTForms2
  do $SYSTEM.OBJ.Load("/tmp/RESTForms2-master/src/Form/Installer.cls", "ck") \
  set vars("Namespace")="MYAPP" \
  set vars("CreateNamespace")="yes" \
  set vars("DataDBPath")="/opt/myapp/db/DATA" \
  set vars("CodeDBPath")="/opt/myapp/db/CODE" \
  set vars("WebApp")="/myapp/api/rf2" \
  set vars("SourcePath")="/tmp/RESTForms2-master/src/" \
  set sc = ##class(Form.Installer).Run(.vars) \
  zn "MYAPP" \
  # install webterminal
  zpm "install webterminal" \
  # install MyApp
  do $SYSTEM.OBJ.Load("/app/src/App/Installer.cls", "ck") \
  set sc = ##class(App.Installer).Run()

# bringing the standard shell back
SHELL ["/bin/bash", "-c"]
CMD [ "-l", "/usr/irissys/mgr/messages.log" ]
