# syntax=docker/dockerfile:1

FROM node:20-alpine
RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app
COPY . .

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# Install make
RUN apk add make --no-cache
RUN apk add g++ --no-cache

# Node specifics
RUN npm install --omit=dev
RUN npm run build

# Remove source files and dev node modules
RUN rm -rf src
RUN rm tsconfig.json
RUN rm -rf node_modules

# Create simple server (What am I doing)
RUN mkdir -p /server
WORKDIR /server
COPY <<EOF /server/index.js
const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../app/build')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../app/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);
EOF

RUN npm init -y
RUN npm install express

# Tell docker about port
EXPOSE 3000

# Serve
CMD ["node", "index.js"]