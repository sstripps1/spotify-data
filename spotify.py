##### Spotify Access Class #####
import os
import json
import spotipy

from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv


class SpotifyData:
    def __init__(self):

        self.client = self.getUserClient()
        
        # Mapping of time ranges to Spotify API time ranges
        self.range_dict = {
            "1Month": "short_term",
            "6Months": "medium_term",
            "1Year": "long_term",
        }

    def getUserClient(self):
        load_dotenv()
        # Check if user has necessary environment variables in a .env file
        if all(
            [
                os.environ.get(var, None)
                for var in [
                    "SPOTIPY_CLIENT_ID",
                    "SPOTIPY_CLIENT_SECRET",
                    "SPOTIPY_REDIRECT_URI",
                ]
            ]
        ):
            client = spotipy.Spotify(auth_manager=SpotifyOAuth(scope="user-top-read"))
            return {"auth": True, "client": client}
        else:
            return {"auth": False, "client": None}

    def topData(self, dataType="tracks", timeRange="6Months"):
        if not self.client["auth"]:
            with open("global_data.json", "r") as f:  # Read from global data
                data = json.load(f)
                return [
                    datum
                    for datum in data
                    if datum["category"] == dataType and datum["range"] == timeRange
                ]
        if dataType == "tracks":
            allData = self.client["client"].current_user_top_tracks(
                limit=50, time_range=self.range_dict[timeRange]
            )
            dataConcise = []
            i = 1
            for track in allData["items"]:
                dataConcise.append(
                    {
                        "rank": i,
                        "name": track["name"],
                        "artist": ", ".join(
                            [artist["name"] for artist in track["artists"]]
                        ),
                        "trackURI": track["uri"],
                        "category": dataType,
                        "range": timeRange,
                    }
                )
                i = i + 1
        else:  # artists
            allData = self.client["client"].current_user_top_artists(
                limit=50, time_range=self.range_dict[timeRange]
            )
            dataConcise = []
            i = 1
            for artist in allData["items"]:
                dataConcise.append(
                    {
                        "rank": i,
                        "name": artist["name"],
                        "category": dataType,
                        "range": timeRange,
                    }
                )
                i = i + 1
        return dataConcise
