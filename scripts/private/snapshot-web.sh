#!/bin/bash

ROOT_DIR=`dirname $0`/../..
cd $ROOT_DIR

SNAP_DIR=angular-recipecat-snapshots-web


rm -rf $SNAP_DIR
mkdir $SNAP_DIR

for i in {0..11}
do
  mkdir $SNAP_DIR/step-$i
  git checkout -f step-$i

    cp -r app test $SNAP_DIR/step-$i/
    rm -rf $SNAP_DIR/step-$i/test/lib/jstestdriver
done
