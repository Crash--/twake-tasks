# Sourced by the QA scripts: the settings of the stack and how to reach it.

REPO_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
GENERATED_DIR="$SCRIPT_DIR/.generated"

QA_PROJECT="${QA_PROJECT:-twake-tasks-qa}"
# Accounts on top of alice and bob, see start.sh
export QA_USERS="${QA_USERS-carol dave erin@globex.e2e.test frank@}"
# QA_PERF_USERS=100 adds perf0001 .. perf0100, people of the organization, editors of a space "Performance" (start.sh), for load tests
QA_PERF_USERS="${QA_PERF_USERS:-0}"
for ((i = 1; i <= QA_PERF_USERS; i++)); do
  QA_USERS="$QA_USERS $(printf 'perf%04d' "$i")"
done
export QA_USERS
export QA_APP_PORT="${QA_APP_PORT:-18800}"
export QA_SPACE_PORT="${QA_SPACE_PORT:-18801}"

compose() {
  docker compose -p "$QA_PROJECT" --project-directory "$REPO_DIR" \
    -f "$REPO_DIR/docker-compose.yml" -f "$SCRIPT_DIR/docker-compose.qa.yml" \
    --profile app "$@"
}
