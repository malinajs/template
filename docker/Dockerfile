FROM node:14

RUN mkdir /app && cd /app && npx degit malinajs/template && npm install \
    && mv /app/src /app/src_orig && chown node:node /app -R
COPY entrypoint.sh /

ENTRYPOINT ["./entrypoint.sh"]
