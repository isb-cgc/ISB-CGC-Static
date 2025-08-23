# Check if we need to rsync static
STATIC_LAST_COMMIT=$(git rev-list -1 HEAD -- "static_site")

if [ ! -f "${STATIC_COMMIT_CHECK_FILE}" ] || [ ${STATIC_LAST_COMMIT} != $(cat "${STATIC_COMMIT_CHECK_FILE}") ]; then
    echo "Beginning rsync of the static site..."
    gsutil rsync -R static_site/ gs://${STATIC_BUCKET}
    git rev-list -1 HEAD -- "static_site" > "${STATIC_COMMIT_CHECK_FILE}"
    gsutil cp "${STATIC_COMMIT_CHECK_FILE}" gs://${DEPLOYMENT_BUCKET}/
else
    echo "No changes found in /static_site -- skipping rsync."
fi

# Clean up the static site directory before deploying the redirect
rm -rf ./static_site
