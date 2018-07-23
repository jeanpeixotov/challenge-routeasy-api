FROM node:9.2

ENV HOME=/home/app

COPY package.json yarn.* $HOME/

WORKDIR $HOME/

RUN yarn && yarn cache clean

COPY . $HOME/

EXPOSE 3000
CMD ["yarn", "start"]
