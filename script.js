// Evidence and Ghost Data
const evidenceTypes = [
  "EMF Level 5",
  "Spirit Box",
  "Freezing Temps",
  "Ghost Writing",
  "Fingerprints",
  "Ghost Orb",
  "D.O.T.S Projector",
];

// Map JSON evidence names to your UI names
const evidenceNameMap = {
  "EMF 5": "EMF Level 5",
  "Freezing Temperatures": "Freezing Temps",
  "D.O.T.S Projector": "D.O.T.S Projector",
  "DOTS Projector": "D.O.T.S Projector",
};

let ghosts = [];
let selectedEvidence = [];
let currentPage = 1;
const ghostsPerPage = 5;

// Fetch ghost data from JSON
fetch("../ghosts.json")
  .then((response) => response.json())
  .then((data) => {
    ghosts = data.map((ghost) => ({
      ...ghost,
      evidence: ghost.evidences.map(
        (evidence) => evidenceNameMap[evidence] || evidence
      ),
    }));
    filterGhosts();
    displayGhosts(ghosts, currentPage);
  })
  .catch((error) => console.error("Error loading ghost data:", error));

// Toggle Evidence Selection
function toggleEvidence(evidence) {
  const index = selectedEvidence.indexOf(evidence);
  if (index === -1) {
    selectedEvidence.push(evidence);
  } else {
    selectedEvidence.splice(index, 1);
  }
  updateEvidenceUI();
  filterGhosts();
}

// Update UI for Evidence
function updateEvidenceUI() {
  document.querySelectorAll(".evidence-item").forEach((item) => {
    const itemText = item.innerText.trim();
    if (selectedEvidence.includes(itemText)) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });
}

// Filter Ghosts Based on Evidence
function filterGhosts() {
  const possibleGhosts = ghosts.filter((ghost) =>
    selectedEvidence.every((evidence) => ghost.evidence.includes(evidence))
  );
  currentPage = 1;
  displayGhosts(possibleGhosts, currentPage);
}

// Reset Button
const resetButton = document.getElementById("reset-button");
if (resetButton) {
  resetButton.addEventListener("click", () => {
    selectedEvidence = [];
    updateEvidenceUI();
    currentPage = 1;
    filterGhosts();
  });
}

// Display Ghosts with Pagination
function displayGhosts(filteredGhosts = ghosts, page = 1) {
  const guideContent = document.getElementById("guide-content");
  if (!guideContent) return;

  const startIndex = (page - 1) * ghostsPerPage;
  const endIndex = startIndex + ghostsPerPage;
  const paginatedGhosts = filteredGhosts.slice(startIndex, endIndex);

  guideContent.innerHTML = paginatedGhosts.length
    ? paginatedGhosts
        .map(
          (ghost) => `
            <div class="ghost-card">
              <h3>${ghost.name}${
            ghost.note
              ? ` <span style="font-size: 0.7em; color: var(--accent-orange);">⚠️ ${ghost.note}</span>`
              : ""
          }</h3>
              <p>${ghost.description}</p>
              <div class="ghost-evidence">
                <strong>Evidence:</strong> ${ghost.evidence.join(", ")}
              </div>
              <div class="ghost-ability">
                <strong>Ability:</strong> ${ghost.ability}
              </div>
              <div class="ghost-weakness">
                <strong>Weakness:</strong> ${ghost.weakness}
              </div>
              ${
                ghost.huntThreshold
                  ? `
              <div style="margin-top: 8px; padding: 4px 8px; background: rgba(239, 68, 68, 0.2); border-radius: 4px; font-size: 0.85em;">
                <strong style="color: var(--accent-red);">Hunt Threshold:</strong> ${ghost.huntThreshold}% sanity
              </div>
              `
                  : ""
              }
            </div>
          `
        )
        .join("")
    : "<p class='warning'>No ghosts match the selected evidence. Try unselecting some evidence.</p>";

  updatePagination(filteredGhosts.length, page);
}

// Pagination
function updatePagination(totalGhosts, currentPage) {
  const totalPages = Math.ceil(totalGhosts / ghostsPerPage) || 1;
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  pagination.innerHTML = `
    <button onclick="changePage(${currentPage - 1})" ${
    currentPage === 1 ? "disabled" : ""
  }>Previous</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button onclick="changePage(${currentPage + 1})" ${
    currentPage >= totalPages ? "disabled" : ""
  }>Next</button>
  `;
}

function changePage(page) {
  const filteredGhosts = ghosts.filter((ghost) =>
    selectedEvidence.every((evidence) => ghost.evidence.includes(evidence))
  );
  if (page < 1 || page > Math.ceil(filteredGhosts.length / ghostsPerPage))
    return;
  currentPage = page;
  displayGhosts(filteredGhosts, page);
}
