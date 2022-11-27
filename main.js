require("dotenv").config();
const converter = require("json-2-csv");
const fs = require("fs");
const { getUserSpotifyLib } = require("./utils");

(async () => {
  const lib = await getUserSpotifyLib();
  const songLib = [];
  for (const song of lib) {
    let songObj = {
      name: song.track.name,
      //Have only seen 1 artist in this array so far but should look into what multiple artists...
      artist: song.track.artists[0].name,
      "added at": song.added_at
    };
    songLib.push(songObj);
  }

  converter.json2csv(songLib, (err, csv) => {
    if (err) {
      throw err;
    }
    fs.writeFileSync(`./data/songs-${Date.now()}.csv`, csv);
  });
})();
