#!/bin/bash
if [ ! -d /app/build/reports/xunit/xml ]
then
    mkdir -p /app/build/reports/xunit/xml/
fi
nosetests --with-xunit --xunit-file=build/reports/xunit/xml/xunit.xml --with-coverage --cover-xml --cover-xml-file=build/reports/cover/xml/coverage.xml --cover-html --cover-html-dir=build/reports/html --cover-package=reseller -v /app/tests
