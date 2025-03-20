set -e
exec node $(dirname "$0")/src/index.js "$@"
