FROM node:13
WORKDIR /portal/

# LABELS
LABEL maintainer="webmaster@i-npz.ru"
LABEL vendor="INPZ"

# APPLICATION PARAMETERS
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

ARG HOST=0.0.0.0
ENV HOST ${HOST}
ARG PORT=4000
ENV PORT ${PORT}
ARG PORT_DEBUGGER=9229

# Database
ARG DATABASE_CONNECTION=postgres
ENV DATABASE_CONNECTION ${DATABASE_CONNECTION}
ARG DATABASE_HOST=localhost
ENV DATABASE_HOST ${DATABASE_HOST}
ARG DATABASE_PORT=5432
ENV DATABASE_PORT ${DATABASE_PORT}
ARG DATABASE_USERNAME=postgres
ENV DATABASE_USERNAME ${DATABASE_USERNAME}
ARG DATABASE_PASSWORD=1234567890
ENV DATABASE_PASSWORD ${DATABASE_PASSWORD}
ARG DATABASE_DATABASE=portaldb
ENV DATABASE_DATABASE ${DATABASE_DATABASE}
ARG DATABASE_SCHEMA=public
ENV DATABASE_SCHEMA ${DATABASE_SCHEMA}
ARG DATABASE_SYNCHRONIZE=true
ENV DATABASE_SYNCHRONIZE ${DATABASE_SYNCHRONIZE}
ARG DATABASE_DROP_SCHEMA=true
ENV DATABASE_DROP_SCHEMA ${DATABASE_DROP_SCHEMA}
ARG DATABASE_MIGRATIONS_RUN=true
ENV DATABASE_MIGRATIONS_RUN ${DATABASE_MIGRATIONS_RUN}
ARG DATABASE_LOGGING=true
ENV DATABASE_LOGGING ${DATABASE_LOGGING}
ARG DATABASE_CACHE=true
ENV DATABASE_CACHE ${DATABASE_CACHE}

# Database Redis
ARG DATABASE_REDIS_HOST=localhost
ENV DATABASE_REDIS_HOST ${DATABASE_REDIS_HOST}
ARG DATABASE_REDIS_PORT=6379
ENV DATABASE_REDIS_PORT ${DATABASE_REDIS_PORT}
ARG DATABASE_REDIS_DB=0
ENV DATABASE_REDIS_DB ${DATABASE_REDIS_DB}
ARG DATABASE_REDIS_PASSWORD
ENV DATABASE_REDIS_PASSWORD ${DATABASE_REDIS_PASSWORD}
ARG DATABASE_REDIS_TTL=300
ENV DATABASE_REDIS_TTL ${DATABASE_REDIS_TTL}

# HTTP Redis
ARG HTTP_REDIS_HOST=localhost
ENV HTTP_REDIS_HOST ${HTTP_REDIS_HOST}
ARG HTTP_REDIS_PORT=6379
ENV HTTP_REDIS_PORT ${HTTP_REDIS_PORT}
ARG HTTP_REDIS_DB=1
ENV HTTP_REDIS_DB ${HTTP_REDIS_DB}
ARG HTTP_REDIS_PASSWORD
ENV HTTP_REDIS_PASSWORD ${HTTP_REDIS_PASSWORD}
ARG HTTP_REDIS_TTL=300
ENV HTTP_REDIS_TTL ${HTTP_REDIS_TTL}
ARG HTTP_REDIS_MAX_OBJECTS=10000
ENV HTTP_REDIS_MAX_OBJECTS ${HTTP_REDIS_MAX_OBJECTS}
ARG HTTP_REDIS_PREFIX
ENV HTTP_REDIS_PREFIX ${HTTP_REDIS_PREFIX}

# Session Redis
ARG SESSION_REDIS_HOST=localhost
ENV SESSION_REDIS_HOST ${SESSION_REDIS_HOST}
ARG SESSION_REDIS_PORT=6379
ENV SESSION_REDIS_PORT ${SESSION_REDIS_PORT}
ARG SESSION_REDIS_DB=2
ENV SESSION_REDIS_DB ${SESSION_REDIS_DB}
ARG SESSION_REDIS_PASSWORD
ENV SESSION_REDIS_PASSWORD ${SESSION_REDIS_PASSWORD}
ARG SESSION_COOKIE_TTL=300
ENV SESSION_COOKIE_TTL ${SESSION_COOKIE_TTL}
ARG SESSION_SECRET="supersecret"
ENV SESSION_SECRET ${SESSION_SECRET}

# LDAP
ARG LDAP_URL=ldap://pdc:389
ENV LDAP_URL ${LDAP_URL}
ARG LDAP_BIND_DN="CN\=user\,DC\=example\,DC\=local"
ENV LDAP_BIND_DN ${LDAP_BIND_DN}
ARG LDAP_BIND_PW=1234567890
ENV LDAP_BIND_PW ${LDAP_BIND_PW}
ARG LDAP_SEARCH_BASE="DC\=example\,DC\=local"
ENV LDAP_SEARCH_BASE ${LDAP_SEARCH_BASE}
ARG LDAP_SEARCH_FILTER="(sAMAccountName\={{username}})"
ENV LDAP_SEARCH_FILTER ${LDAP_SEARCH_FILTER}
ARG LDAP_SEARCH_GROUP="(&(objectClass=group)(member={{dn}}))"
ENV LDAP_SEARCH_GROUP ${LDAP_SEARCH_GROUP}
ARG LDAP_SEARCH_BASE_ALL_USERS="DC\=example\,DC\=local"
ENV LDAP_SEARCH_BASE_ALL_USERS ${LDAP_SEARCH_BASE_ALL_USERS}
ARG LDAP_SEARCH_FILTER_ALL_USERS="(\&(\&(\|(\&(objectClass\=user)(objectCategory\=person))(&(objectClass\=contact)(objectCategory\=person)))))"
ENV LDAP_SEARCH_FILTER_ALL_USERS ${LDAP_SEARCH_FILTER_ALL_USERS}

# LDAP Redis
ARG LDAP_REDIS_HOST="localhost"
ENV LDAP_REDIS_HOST ${LDAP_REDIS_HOST}
ARG LDAP_REDIS_PORT=6379
ENV LDAP_REDIS_PORT ${LDAP_REDIS_PORT}
ARG LDAP_REDIS_DB=2
ENV LDAP_REDIS_DB ${LDAP_REDIS_DB}
ARG LDAP_REDIS_PASSWORD
ENV LDAP_REDIS_PASSWORD ${LDAP_REDIS_PASSWORD}
ARG LDAP_REDIS_TTL=300
ENV LDAP_REDIS_TTL ${LDAP_REDIS_TTL}

# Microservices
ARG MICROSERVICE_URL="nats://nats-cluster.nats-io:4222"
ENV MICROSERVICE_URL ${MICROSERVICE_URL}
ARG MICROSERVICE_USER="admin"
ENV MICROSERVICE_USER ${MICROSERVICE_USER}
ARG MICROSERVICE_PASS="supersecret"
ENV MICROSERVICE_PASS ${MICROSERVICE_PASS}

# SOAP
ARG SOAP_URL="https://soap1c"
ENV SOAP_URL ${SOAP_URL}
ARG SOAP_USER="admin"
ENV SOAP_USER ${SOAP_USER}
ARG SOAP_PASS="supersecret"
ENV SOAP_PASS ${SOAP_PASS}

# News
ARG NEWS_URL="https://news"
ENV NEWS_URL ${NEWS_URL}
ARG NEWS_API_URL="https://news/api"
ENV NEWS_API_URL ${NEWS_API_URL}

# Mail
ARG MAIL_URL="https://portal"
ENV MAIL_URL ${MAIL_URL}
ARG MAIL_LOGIN_URL="https://roundcube.mail/login/index.php"
ENV MAIL_LOGIN_URL ${MAIL_LOGIN_URL}

# Meeting
ARG MEETING_URL="https://meeting"
ENV MEETING_URL ${MEETING_URL}


# PREPARE DEVELOPMENT
#RUN apt-get update && apt-get install -y \
#  net-tools \ip
#  telnet \
#  dnsutils \
#  nano \
#  && rm -rf /var/lib/apt/lists/*

# FOR BUILD
# RUN set -ex; \
#   apt-get update \
#   && apt-get install -y openssl libpq-dev

# COPY
COPY . ./

# EXPOSE
EXPOSE ${PORT} ${PORT_DEBUGGER}

# YARN START
ENTRYPOINT [ "./entrypoint.sh" ]
CMD [ "start" ]
