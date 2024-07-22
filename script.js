document.getElementById('addVinylForm').addEventListener('submit', addVinyl);
document.getElementById('searchInput').addEventListener('input', searchVinyls);

let vinyls = JSON.parse(localStorage.getItem('vinyls')) || [];
displayVinyls(vinyls);

function addVinyl(e) {
    e.preventDefault();

    let artist = document.getElementById('artist').value;
    let album = document.getElementById('album').value;
    let year = document.getElementById('year').value;
    let photo = document.getElementById('photo').files[0];

    let reader = new FileReader();
    reader.onload = function(e) {
        let vinyl = {
            artist: artist,
            album: album,
            year: year,
            photo: e.target.result
        };
        vinyls.push(vinyl);
        localStorage.setItem('vinyls', JSON.stringify(vinyls));
        displayVinyls(vinyls);
    };
    reader.readAsDataURL(photo);

    document.getElementById('addVinylForm').reset();
}

function displayVinyls(vinyls) {
    let vinylList = document.getElementById('vinyls');
    vinylList.innerHTML = '';
    vinyls.forEach(vinyl => {
        let li = document.createElement('li');
        li.innerHTML = `
            <img src="${vinyl.photo}" alt="${vinyl.album}">
            <div>
                <strong>Artista:</strong> ${vinyl.artist}<br>
                <strong>Álbum:</strong> ${vinyl.album}<br>
                <strong>Ano:</strong> ${vinyl.year}
            </div>
        `;
        vinylList.appendChild(li);
    });
}

function searchVinyls() {
    let query = document.getElementById('searchInput').value.toLowerCase();
    let filteredVinyls = vinyls.filter(vinyl => 
        vinyl.artist.toLowerCase().includes(query) || 
        vinyl.album.toLowerCase().includes(query) || 
        vinyl.year.toString().includes(query)
    );
    displayVinyls(filteredVinyls);
}
