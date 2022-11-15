const albumCover = document.querySelector(".album-cover");
const artistName = document.querySelector(".posted-by-artist");
const albumYear = document.querySelector("year");
const albumCoverContainer = document.querySelector(".album-cover");
const albumTotalSongs = document.queryCommandValue(".total-songs");
const albumDuration = document.querySelector(".duration");
//try {
async function getAlbum() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
    {
      method: "GET",
    }
  );
  const album = await response.json();
  console.log(album);
  return album;
}
// } catch (error) {
//   window.alert("Something went wrong during Album fetch");
// }

function renderAlbum(album) {
  console.log(album.release_date);
  //   albumName.innerText = album.name;
  //   artistNamePosted.innerText = artist.name;
  //   artistNamePlaylist.innerText = "Best of " + artist.name;
  //   artistContainer.style.backgroundImage = `url(${artist.picture_xl})`;
  //   artistCircle.style.backgroundImage = `url(${artist.picture_small})`;
  //   smallAlbum.src = artist.picture_medium;
  albumCover.innerHTML = `
    <div class="album-cover-info d-flex justify-content-start mt-3">
            <img
              src="Zion_(Official_Album_Cover)_by_Hillsong_United.png"
              alt="Tribal"
              class="img-fluid image-cover"
            />
            <div class="cover-info ml-4 mt-auto">
              <span>ALBUM</span>
              <h2 class="album-name">${album.title}</h2>
              <div
                class="song-info d-flex justify-content-end align-items-center"
              >
                <img src="${album.artist.picture}" alt="" class="album-profile-img" />
                <span><h6 class="posted-by-artist">${album.artist.name}</h6> </span>
                <span class="year">. ${album.release_date}.</span>

                <span class="total-songs">18 songs</span>
                <span class="duration">, 1 hr 30min</span>
              </div>
            </div>
          </div>
    `;
}

window.onload = async () => {
  const album = await getAlbum();
  renderAlbum(album);
};
