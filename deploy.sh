npm run build
aws s3 sync build s3://wholesometools.com --delete --acl public-read
aws cloudfront create-invalidation --distribution-id E185V9XM7RMZN6 --paths "/*"
