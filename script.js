

const fileInput = document.getElementById('fileInput');
const playlistContainer = document.getElementById('playlistContainer');
const searchInput = document.getElementById('searchInput');
const groupSelect = document.getElementById('groupSelect');
const searchButton = document.getElementById('searchButton');
const paginationContainer = document.getElementById('paginationContainer');

let currentPage = 1;
let itemsPerPage = 10;
let totalItems = 0;
let playlist = [];
let groups = [];
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const m3uContent = event.target.result;
    parseM3U(m3uContent);
  };

  reader.readAsText(file);
});

searchButton.addEventListener('click', () => {
  searchChannels();
});

groupSelect.addEventListener('change', () => {
  filterByGroup();
});

function parseM3U(m3uContent) {
  const lines = m3uContent.split('\n');
  const playlist = [];

  lines.forEach((line) => {
    if (line.startsWith('#EXTINF')) {
      const title = line.split(',')[1];
      const group = line.split(',')[2];
      playlist.push({ title, group });
    } else if (line.trim() !== '') {
      playlist[playlist.length - 1].url = line.trim();
    }
  });

  this.playlist = playlist;
  populateGroupSelect();
  displayChannels();
}

function populateGroupSelect() {
  const uniqueGroups = [...new Set(playlist.map((item) => item.group))];
  uniqueGroups.sort();

  groupSelect.innerHTML = '';
  uniqueGroups.forEach((group) => {
    const option = document.createElement('option');
    option.value = group;
    option.textContent = group;
    groupSelect.appendChild(option);
  });
}

function displayChannels() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredPlaylist = searchChannels();

  playlistContainer.innerHTML = '';
  filteredPlaylist.slice(startIndex, endIndex).forEach((item) => {
    const itemElement = document.createElement('li');
    itemElement.textContent = item.title;
    playlistContainer.appendChild(itemElement);
  });

  updatePaginationInfo();
}

function searchChannels() {
  const searchQuery = searchInput.value.toLowerCase();
  const filteredPlaylist = playlist.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery);
  });

  return filteredPlaylist;
}

function filterByGroup() {
  const selectedGroup = groupSelect.value;
  const filteredPlaylist = playlist.filter((item) => {
    return item.group === selectedGroup;
  });

  displayChannels();
}

function updatePaginationInfo() {
  const totalPaginationPages = Math.ceil(playlist.length / itemsPerPage);
  const paginationHtml = [];

  for (let i = 1; i <= totalPaginationPages; i++) {
    const paginationButton = document.createElement('button');
    paginationButton.textContent = i;
    paginationButton.addEventListener('click', () => {
      currentPage = i;
      displayChannels();
    });

    paginationHtml.push(paginationButton);
  }

  paginationContainer.innerHTML = '';
  paginationContainer.appendChild(paginationHtml[0]);
  paginationContainer.appendChild(paginationHtml[totalPaginationPages - 1]);
}

// Play stream by redirecting to the player page
function playStream(url, name) {
    const playerUrl=https://eat-paax2g1gl-xyz-6cc64b76.vercel.app/?url=${encodeURIComponent(url)}&name=${encodeURIComponent(name)}`;
    window.location.href = playerUrl;https://eat-paax2g1gl-xyz-6cc64b76.vercel.app/
  }
