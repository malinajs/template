FROM node:14

RUN mkdir -p /app && chown node:node /app -R
COPY entrypoint.sh /

ENTRYPOINT ["./entrypoint.sh"]
