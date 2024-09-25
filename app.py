from flask import Flask, jsonify, request
from flask_caching import Cache

from spotify import SpotifyData

app = Flask(__name__)

cache = Cache(app, config={"CACHE_TYPE": "simple"})


@app.route("/top_data", methods=["GET"])
@cache.cached(query_string=True, timeout=60)
def retrieve_data():
    dataType = request.args.get("type")
    timeRange = request.args.get("range")
    try:
        top_results = SpotifyData().topData(dataType=dataType, timeRange=timeRange)
        response = {"message": "Success", "data": top_results}
    except Exception as e:
        print(e)
        response = {"message": "Error: {e}", "data": []}
    return jsonify(response)

@app.route("/app_title", methods=["GET"])
def get_app_title():
    # Gets the app title based on whether the user is authenticated
    client = SpotifyData().client
    if client["auth"]:
        title =  "Your Spotify Data"
    else:
        title = "Global Spotify Data"
    
    return jsonify({"title": title})


if __name__ == "__main__":
    app.run(debug=True)
