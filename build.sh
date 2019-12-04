#!/bin/bash

TOTAL_STEPS=4
CURRENT_STEP=0
if [ -e build ]
 then
  TOTAL_STEPS=5
  CURRENT_STEP=$(($CURRENT_STEP + 1))
  echo [$CURRENT_STEP/$TOTAL_STEPS] Removing old build...
  rm -r build
fi

CURRENT_STEP=$(($CURRENT_STEP + 1))
echo [$CURRENT_STEP/$TOTAL_STEPS] Creating new build...
mkdir build

CURRENT_STEP=$(($CURRENT_STEP + 1))
echo [$CURRENT_STEP/$TOTAL_STEPS] Building client...
cd client
if ! npm run build >& /dev/null
 then exit 1
fi
cd ..

CURRENT_STEP=$(($CURRENT_STEP + 1))
echo [$CURRENT_STEP/$TOTAL_STEPS] Copying client to build...
mkdir build/client
cp -r client/build build/client/

CURRENT_STEP=$(($CURRENT_STEP + 1))
echo [$CURRENT_STEP/$TOTAL_STEPS] Copying server to build...
cp -r src build/
cp index.js build
cp package*.json build

echo Build complete"!"
