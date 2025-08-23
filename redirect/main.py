from flask import Flask, redirect, request
import os

app = Flask(__name__)

redirect_host="https://"+os.environ["REDIRECT_HOST"]

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    # Preserve the path and query string when redirecting
    new_url = f"{redirect_host}/{path}"
    if request.query_string:
        new_url += f"?{request.query_string.decode('utf-8')}"
    return redirect(new_url, code=301)  # 302 temporary redirect (use 301 for permanent)


if __name__ == "__main__":
    app.run()
