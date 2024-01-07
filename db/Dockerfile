FROM mysql

ADD ./init/init.sql /docker-entrypoint-initdb.d

EXPOSE ${MYSQL_PORT}