FROM recruity11/base:github

ENV NODE_ENV production

WORKDIR /usr/src/master/nexters-web

RUN git checkout master && \
    git pull && \
    npm install

EXPOSE 8080

CMD ["npm", "start"]
