FROM node:12.17.0

LABEL MAINTAINER="DC <oparahdc@gmail.com>"
LABEL application="Scrappr"

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true



ENV TERM=xterm-256color

WORKDIR /usr/app

COPY package.json /usr/app

RUN apt-get update \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Install puppeteer so it's available in the container.
RUN yarn add puppeteer

RUN yarn install
