#!/bin/bash

gsutil rsync -r -d -x ".git/*" . gs://isb-cgc-dev-static.isb-cgc.org/
