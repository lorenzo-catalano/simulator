# docker build -t simulator -f ./Dockerfile .
# docker run -d --name=simulator -p 3333:3333 -v ~/projects/simulator/:/tmp/simulator simulator:latest
FROM node:12.16.1-stretch-slim


#RUN  apt-get update -y && \
#     apt-get upgrade -y && \
#     apt-get dist-upgrade -y && \
#     apt-get -y autoremove && \
#     apt-get clean

RUN apt update
RUN apt install -y curl unzip libaio1 libaio-dev

RUN curl -k -o instaclient.zip https://download.oracle.com/otn_software/linux/instantclient/19600/instantclient-basic-linux.x64-19.6.0.0.0dbru.zip

RUN unzip instaclient.zip


ENV SIMULATOR_PORT 9087
ENV LD_LIBRARY_PATH="$HOME/instantclient_19_6" 

RUN pwd
COPY ./package.json /tmp/simulator/
COPY ./.npmrc /tmp/simulator/
RUN cd /tmp/simulator && npm install --verbose


COPY ./*.js /tmp/simulator/
COPY ./tests/ /tmp/simulator/tests/
COPY ./certs/ /tmp/simulator/certs/

WORKDIR /tmp/simulator/

CMD ["node", "/tmp/simulator/simulator.js"]