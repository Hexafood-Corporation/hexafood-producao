FROM node:18

USER root

RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY . /home/node/app

RUN chown -R node:node /home/node/app

USER node

RUN yarn install 

# # Copie o script de inicialização para o container
COPY start.sh .
COPY wait-for-it.sh .

# Comando para executar o script de inicialização
# CMD ["./start.sh"]

EXPOSE 3000
