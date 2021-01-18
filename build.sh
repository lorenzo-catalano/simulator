  #!/bin/bash
  WEB_PROXY="http://10.45.5.150:8080"

  docker build \
    --build-arg HTTP_PROXY=$WEB_PROXY \
    --build-arg HTTPS_PROXY=$WEB_PROXY \
    --build-arg http_proxy=$WEB_PROXY \
    --build-arg https_proxy=$WEB_PROXY \
    -t simulator:0.0.1 .