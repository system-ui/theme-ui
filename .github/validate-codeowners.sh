# usage
# bash validate-codeowners.sh <github-token>

if [ "$1" != "" ]; then
  export GH_TOKEN=$1
fi

docker run --rm -v $(pwd):/repo -w /repo \
  -e REPOSITORY_PATH="." \
  -e GITHUB_ACCESS_TOKEN="$GH_TOKEN" \
  -e OWNER_CHECKER_REPOSITORY="system-ui/theme-ui" \
  mszostok/codeowners-validator:v0.5.1
