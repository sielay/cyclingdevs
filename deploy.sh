#!/bin/bash
aws configure set default.s3.max_concurrent_requests 50
aws s3 sync ./public s3://cyclingdevs.com --acl=public-read --delete
aws cloudfront create-invalidation --distribution-id E3PI3QF41FDIJC --paths "/*"