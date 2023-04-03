FROM postgres:latest

# Install Sqitch and its dependencies
RUN apt-get update && apt-get install -y sqitch libdbd-pg-perl postgresql-client libdbd-sqlite3-perl sqlite3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV TARGET=dev
# Initialize Sqitch

COPY ./migrations /migrations

RUN cd /migrations && sqitch init circles --target $TARGET

CMD ["postgres"]