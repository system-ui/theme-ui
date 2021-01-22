#!/bin/bash

# Does the branch name start with "dependabot/"
if [[ "$VERCEL_GIT_COMMIT_REF" = dependabot/* ]] ; then
  echo "should-skip-deploy >> Skipping deploy!"
  exit 0;
else
  echo "should-ski-deploy >> Proceeding with deploy."
  exit 1;
fi
