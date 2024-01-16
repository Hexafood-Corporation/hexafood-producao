#!/usr/bin/env bash
# Use this script to test if a given TCP host/port are available

WAITFORIT_cmdname=${0##*/}

echoerr() { if [[ $WAITFORIT_QUIET -ne 1 ]]; then echo "$@" 1>&2; fi }

usage()
{
    cat << USAGE >&2
Usage:
    $WAITFORIT_cmdname host:port [-s] [-t timeout] [-- command args]
    -h HOST | --host=HOST       Host or IP under test
    -p PORT | --port=PORT       TCP port under test
                                Alternatively, you specify the host and port as host:port
    -s | --strict               Only execute subcommand if the test succeeds
    -q | --quiet                Don't output any status messages
    -t TIMEOUT | --timeout=TIMEOUT
                                Timeout in seconds, zero for no timeout
    -- COMMAND ARGS             Execute command with args after the test finishes
USAGE
    exit 1
}

wait_for()
{
    if [[ $WAITFORIT_TIMEOUT -gt 0 ]]; then
        echo "Waiting for $WAITFORIT_HOST:$WAITFORIT_PORT..."
        WAITFORIT_CMD="nc -z $WAITFORIT_HOST $WAITFORIT_PORT"
    else
        echo "Waiting for $WAITFORIT_HOST:$WAITFORIT_PORT without a timeout"
        WAITFORIT_CMD="nc -z $WAITFORIT_HOST $WAITFORIT_PORT"
    fi

    $WAITFORIT_CMD
    WAITFORIT_RESULT=$?

    if [[ $WAITFORIT_RESULT -ne 0 ]]; then
        echo "Service $WAITFORIT_HOST:$WAITFORIT_PORT is not available"
        exit $WAITFORIT_RESULT
    fi

    echo "Service $WAITFORIT_HOST:$WAITFORIT_PORT is available"
}

wait_for

if [[ $# -ne 0 ]]; then
    echo "Executing command $@"
    exec "$@"
fi