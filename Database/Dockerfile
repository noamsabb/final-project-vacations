FROM mongo:6.0

# Copy a JavaScript or shell init script

COPY ./dump /docker-entrypoint-initdb.d/dump
COPY ./restore.sh /docker-entrypoint-initdb.d/restore.sh
