gsutil cp "gs://${DEPLOYMENT_BUCKET}/${STATIC_COMMIT_CHECK_FILE}" ./static_site/${STATIC_COMMIT_CHECK_FILE}
gsutil cp "gs://${DEPLOYMENT_BUCKET}/${REDIRECT_APP_YAML}" ./app.yaml
