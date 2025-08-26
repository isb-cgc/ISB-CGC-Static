from flask import Flask, redirect, request, jsonify
from flask_talisman import Talisman
import os
import logging

IS_APP_ENGINE = bool(os.environ.get("IS_APP_ENGINE", "false").lower() == "true")
redirect_host = "https://{}".format(os.environ["REDIRECT_HOST"])

if IS_APP_ENGINE:
    import google.cloud.logging
    client = google.cloud.logging_v2.Client()
    client.setup_logging()

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO if IS_APP_ENGINE else logging.DEBUG)

def create_app(test_config=None):
    app = None
    try:
        app = Flask(__name__, static_folder='api_static')
        if IS_APP_ENGINE:
            Talisman(app, strict_transport_security_max_age=300, content_security_policy={
                'default-src': [
                    '\'self\'',
                    '*.googleapis.com',
                    '*.swagger.io',
                    '\'unsafe-inline\'',
                    'data:'
                ]
            })

        # Error handlers
        @app.errorhandler(500)
        def unexpected_error(e):
            """Handle exceptions by returning swagger-compliant json."""
            logger.error('[ERROR] An error occurred while processing the request:')
            logger.exception(e)
            response = jsonify({
                'code': 500,
                'message': 'Exception: {}'.format(e)
            })
            response.status_code = 500
            return response

        @app.route("/", defaults={"path": ""})
        @app.route("/<path:path>")
        def catch_all(path):
            # Preserve the path and query string when redirecting
            new_url = f"{redirect_host}/{path}"
            if request.query_string:
                new_url += f"?{request.query_string.decode('utf-8')}"
            return redirect(new_url, code=301)  # 302 temporary redirect (use 301 for permanent)
        
    except Exception as e:
        logger.error("[ERROR] During Flask app creation: ")
        logger.exception(e)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host='127.0.0.1', port=8090, debug=True)
