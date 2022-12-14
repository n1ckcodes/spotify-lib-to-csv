const axios = require("axios");

exports.getUserSpotifyLib = async () => {
  const data = [];
  //50 items is max that can be queried at a time
  let url = `https://api.spotify.com/v1/me/tracks?market=US&limit=50`;
  //retry counter
  let errorCount = 0;
  console.log(`Loading users spotify library...`)
  do {
    //these calls might work async but I'm not sure what the rate limit is on spotify lib and didn't check
    await axios
      .get(url, {
        headers: {
          "Accept-Encoding": "application/json",
          Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        url = res.data.next;
        if (res.data.items.length > 0) {
          data.push(...res.data.items);
        }
        console.log(`Song count: ${data.length}`)
      })
      .catch((e) => {
        if (e.response) {
          errorCount += 1;
          console.log(e.response.data);
        } else {
          errorCount += 1;
          console.log(e);
        }
      });
  } while (url != undefined && errorCount <= 5);

  return data;
};

