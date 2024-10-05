FROM postgres:15.5

# Copy the .env file into the container
COPY .env /app/.env

# Copy the init.sql file
COPY init.sql /docker-entrypoint-initdb.d/init.sql

# Set environment variables from .env file
ENV $(cat /app/.env | xargs)

EXPOSE 5432

CMD ["docker-entrypoint.sh"]


