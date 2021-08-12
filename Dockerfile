FROM node:14-alpine as base

WORKDIR /home/app
COPY package.json yarn.lock ./
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN yarn --pure-lockfile
COPY . .
CMD ["yarn", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN yarn
COPY . .
CMD ["yarn", "dev"]