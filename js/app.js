// ===================================
// APP LOGIC
// ===================================

// Store current filtered templates for re-randomization
let currentFilteredTemplates = [];
let currentSelectedSubject = "";
let currentHashtagString = "";

// Fisher-Yates shuffle algorithm for randomizing array
function shuffleArray(array) {
  const shuffled = [...array]; // Create a copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function initializeApp() {
  // Update theme icon (theme.js should be loaded first)
  if (typeof updateThemeIcon === 'function') {
    const savedTheme = localStorage.getItem("theme") || "light";
    updateThemeIcon(savedTheme);
  }

  const subjectSelect = document.getElementById("subjectSelect");
  Object.keys(hashtagData).forEach((subject) => {
    subjectSelect.innerHTML += `<option value="${subject}">${subject}</option>`;
  });

  const generalSelect = document.getElementById("generalSelect");
  generalHashtags.forEach((tag) => {
    generalSelect.innerHTML += `<option value="${tag}">${tag}</option>`;
  });

  const typeSelect = document.getElementById("typeSelect");
  const uniqueTypes = [...new Set(hookTemplates.map((h) => h.type))];
  typeSelect.innerHTML += uniqueTypes
    .map((type) => `<option value="${type}">${type}</option>`)
    .join("");

  // Initialize category tabs
  initializeCategoryTabs();

  handleSubjectChange();
}

function initializeCategoryTabs() {
  const categoryTabs = document.getElementById("categoryTabs");
  const uniqueTypes = ["All", ...new Set(hookTemplates.map((h) => h.type))];
  
  // Category labels mapping with emoji, text, and background color class
  const categoryData = {
    "All": { 
      emoji: "", 
      text: "সব (All)",
      bgClass: "category-bg-secondary"
    },
    "🧠 Exam & Knowledge": { 
      emoji: "🧠", 
      text: "Exam & Knowledge",
      bgClass: "category-bg-primary"
    },
    "🔥 Challenge": { 
      emoji: "🔥", 
      text: "Challenge",
      bgClass: "category-bg-danger"
    },
    "🕵️ Curiosity": { 
      emoji: "🕵️", 
      text: "Curiosity",
      bgClass: "category-bg-info"
    },
    "⚡ Urgency": { 
      emoji: "⚡", 
      text: "Urgency",
      bgClass: "category-bg-warning"
    },
    "🎭 Fun & Social": { 
      emoji: "🎭", 
      text: "Fun & Social",
      bgClass: "category-bg-success"
    }
  };

  categoryTabs.innerHTML = uniqueTypes.map((type, index) => {
    const data = categoryData[type] || { emoji: "", text: type, bgClass: "category-bg-secondary" };
    const isActive = index === 0 ? "active" : "";
    // Create safe ID
    const safeId = `tab-${index}`;
    const emojiHtml = data.emoji ? `<span class="tab-emoji">${data.emoji}</span>` : '';
    const textHtml = `<span class="tab-text">${data.text}</span>`;
    
    return `
      <li class="nav-item" role="presentation">
        <button class="nav-link ${data.bgClass} ${isActive}" 
                id="${safeId}" 
                data-type="${type.replace(/"/g, '&quot;')}"
                type="button">
          ${emojiHtml}${textHtml}
        </button>
      </li>
    `;
  }).join("");

  // Add event listeners to tabs
  categoryTabs.querySelectorAll('.nav-link').forEach(tab => {
    tab.addEventListener('click', function() {
      const categoryType = this.getAttribute('data-type');
      switchCategory(categoryType);
    });
  });
}

function switchCategory(categoryType) {
  // Update dropdown to match selected tab
  document.getElementById("typeSelect").value = categoryType;
  
  // Update active tab
  const tabs = document.querySelectorAll("#categoryTabs .nav-link");
  let activeTab = null;
  tabs.forEach(tab => {
    tab.classList.remove("active");
    if (tab.getAttribute("data-type") === categoryType) {
      tab.classList.add("active");
      activeTab = tab;
    }
  });
  
  // Scroll active tab into view on mobile (horizontal scroll)
  if (activeTab) {
    const container = document.querySelector('.category-tabs-container');
    const tabRect = activeTab.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Check if tab is outside visible area
    if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
      activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }
  
  // Apply filters
  applyFilters();
  
  // Scroll to top of results
  document.getElementById("hookOutputGrid").scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleSubjectChange() {
  const selectedSubject = document.getElementById("subjectSelect").value;
  const topicSelect = document.getElementById("topicSelect");
  const relevantTopics = hashtagData[selectedSubject].topics;

  topicSelect.innerHTML = relevantTopics
    .map((topic) => `<option value="${topic}">${topic}</option>`)
    .join("");
  applyFilters();
}

function applyFilters() {
  const selectedSubject = document.getElementById("subjectSelect").value;
  const selectedType = document.getElementById("typeSelect").value;
  const searchTerm = document
    .getElementById("searchBar")
    .value.toLowerCase();
  const manualOverride = document
    .getElementById("topicOverride")
    .value.trim();

  // LOGIC: Check override first, otherwise use dropdown
  let tag1_Topic;
  if (manualOverride) {
    // Clean input: remove spaces, special chars, ensure # at start
    const cleanText = manualOverride
      .replace(/\s+/g, "")
      .replace(/[^\w\u0980-\u09FF]/g, "");
    tag1_Topic = cleanText.startsWith("#") ? cleanText : "#" + cleanText;
  } else {
    tag1_Topic = document.getElementById("topicSelect").value;
  }

  const tag2_Subject = hashtagData[selectedSubject].primaryTag;
  const tag3_General = document.getElementById("generalSelect").value;

  const fullHashtagString = `${tag1_Topic} ${tag2_Subject} ${tag3_General}`;

  const filteredTemplates = hookTemplates.filter((hook) => {
    const typeMatch =
      selectedType === "All" || hook.type === selectedType;
    const searchMatch =
      !searchTerm ||
      hook.template.toLowerCase().includes(searchTerm) ||
      hook.type.toLowerCase().includes(searchTerm);
    return typeMatch && searchMatch;
  });

  // Store current filtered templates for re-randomization
  currentFilteredTemplates = filteredTemplates;
  currentSelectedSubject = selectedSubject;
  currentHashtagString = fullHashtagString;

  // Shuffle the filtered templates for random order
  const shuffledTemplates = shuffleArray(filteredTemplates);

  // Update active tab to match selected type
  updateActiveTab(selectedType);

  renderHooks(shuffledTemplates, selectedSubject, fullHashtagString);
}

function updateActiveTab(selectedType) {
  const tabs = document.querySelectorAll("#categoryTabs .nav-link");
  tabs.forEach(tab => {
    tab.classList.remove("active");
    if (tab.getAttribute("data-type") === selectedType) {
      tab.classList.add("active");
    }
  });
}

function renderHooks(filteredHooks, selectedSubject, hashtags) {
  const grid = document.getElementById("hookOutputGrid");
  grid.innerHTML = "";
  document.getElementById("hookCount").textContent = filteredHooks.length;

  if (filteredHooks.length === 0) {
    grid.innerHTML =
      '<div class="alert alert-warning">কোনো ফলাফল পাওয়া যায়নি। ফিল্টার পরিবর্তন করুন।</div>';
    return;
  }

  let tableHTML = `
          <div class="table-responsive">
              <table class="table table-hover table-bordered align-middle shadow-sm">
                  <thead>
                      <tr>
                          <th style="width: 5%" class="text-center">#</th>
                          <th style="width: 15%">ক্যাটাগরি</th>
                          <th>ক্যাপশন ও হ্যাশট্যাগ (Preview)</th>
                          <th style="width: 15%" class="text-center">অ্যাকশন</th>
                      </tr>
                  </thead>
                  <tbody>
      `;

  filteredHooks.forEach((hook, index) => {
    const dynamicHookText = hook.template.replace(
      /{{Subject}}/g,
      selectedSubject
    );

    let badgeClass = "bg-secondary";
    if (hook.type.includes("Challenge")) badgeClass = "bg-danger";
    if (hook.type.includes("Knowledge")) badgeClass = "bg-primary";
    if (hook.type.includes("Curiosity")) badgeClass = "bg-info text-dark";
    if (hook.type.includes("Urgency"))
      badgeClass = "bg-warning text-dark";
    if (hook.type.includes("Fun")) badgeClass = "bg-success";

    const safeCaption = dynamicHookText.replace(/'/g, "\\'");
    const safeTags = hashtags.replace(/'/g, "\\'");

    tableHTML += `
              <tr class="hook-row" onclick="copyRowToClipboard(this, '${safeCaption}', '${safeTags}')">
                  <td class="fw-bold text-secondary text-center">${index + 1
      }</td>
                  <td>
                      <span class="badge ${badgeClass} badge-category">${hook.type.split(" ")[1]
      }</span>
                  </td>
                  <td>
                      <div class="caption-text">${dynamicHookText}</div>
                      <div class="hashtag-block">${hashtags}</div>
                  </td>
                  <td class="text-center">
                      <button class="btn btn-sm btn-outline-primary" 
                          onclick="event.stopPropagation(); copyToClipboard(this, '${safeCaption}', '${safeTags}')">
                          <i data-lucide="copy" class="lucide lucide-copy"></i> কপি
                      </button>
                  </td>
              </tr>
          `;
  });

  tableHTML += `</tbody></table></div>`;
  grid.innerHTML = tableHTML;
  lucide.createIcons();
}

function reRandomizeCurrentCategory() {
  // Re-shuffle the current filtered templates
  if (currentFilteredTemplates.length > 0) {
    const shuffledTemplates = shuffleArray(currentFilteredTemplates);
    renderHooks(shuffledTemplates, currentSelectedSubject, currentHashtagString);
  }
}

function copyRowToClipboard(row, caption, hashtags) {
  const fullText = `${caption}\n${hashtags}`;
  navigator.clipboard.writeText(fullText).then(() => {
    // Visual feedback on row
    row.classList.add('row-copied');
    const originalBg = row.style.backgroundColor;
    row.style.backgroundColor = 'rgba(25, 135, 84, 0.2)';
    row.style.transition = 'background-color 0.3s ease';
    
    // Re-randomize the category after copying
    setTimeout(() => {
      reRandomizeCurrentCategory();
    }, 100);
    
    setTimeout(() => {
      row.style.backgroundColor = originalBg;
      setTimeout(() => {
        row.classList.remove('row-copied');
      }, 300);
    }, 1500);
  });
}

function copyToClipboard(button, caption, hashtags) {
  const fullText = `${caption}\n${hashtags}`;
  navigator.clipboard.writeText(fullText).then(() => {
    const originalHTML = button.innerHTML;
    button.innerHTML =
      '<span class="fw-bold"><i data-lucide="check"></i> কপিড!</span>';
    button.classList.replace("btn-outline-primary", "btn-success");
    lucide.createIcons();
    
    // Re-randomize the category after copying
    setTimeout(() => {
      reRandomizeCurrentCategory();
    }, 100);
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.classList.replace("btn-success", "btn-outline-primary");
      lucide.createIcons();
    }, 1500);
  });
}

function resetFilters() {
  document.getElementById("subjectSelect").selectedIndex = 0;
  document.getElementById("generalSelect").selectedIndex = 0;
  document.getElementById("typeSelect").value = "All";
  document.getElementById("searchBar").value = "";
  document.getElementById("topicOverride").value = ""; // Reset Override
  switchCategory("All");
  handleSubjectChange();
}

function toggleFilterPanel() {
  const panel = document.getElementById("settingsPanel");
  const toggleBtn = document.getElementById("filterToggleBtn");
  
  if (panel) {
    panel.classList.toggle("collapsed");
    
    // Update toggle button icon
    if (toggleBtn) {
      const icon = toggleBtn.querySelector("i");
      if (panel.classList.contains("collapsed")) {
        icon.setAttribute("data-lucide", "filter");
      } else {
        icon.setAttribute("data-lucide", "x");
      }
      lucide.createIcons();
    }
  }
}

// Make functions globally accessible for inline event handlers
window.handleSubjectChange = handleSubjectChange;
window.applyFilters = applyFilters;
window.copyToClipboard = copyToClipboard;
window.copyRowToClipboard = copyRowToClipboard;
window.resetFilters = resetFilters;
window.switchCategory = switchCategory;
window.toggleFilterPanel = toggleFilterPanel;

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
