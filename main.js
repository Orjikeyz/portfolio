"use strict";

const projectGrid = document.querySelector("#project-grid");
const projectCount = document.querySelector("#project-count");
const viewMoreButton = document.querySelector("#view-more-projects");
const initialProjectCount = 6;
const projectData = typeof projects !== "undefined" && Array.isArray(projects) ? projects : [];
let showAllProjects = false;

function safeProjectUrl(value) {
  const rawUrl = String(value ?? "").trim();

  if (!rawUrl) return "#";
  if (/^[a-z][a-z\d+.-]*:/i.test(rawUrl) && !/^https?:\/\//i.test(rawUrl)) return "#";

  try {
    return new URL(/^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`, window.location.href).href;
  } catch {
    return "#";
  }
}

function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card";

  const link = document.createElement("a");
  link.className = "project-image";
  link.href = safeProjectUrl(project.url);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `Visit ${project.name ?? "project"}`);

  const image = document.createElement("img");
  image.alt = `${project.name ?? "Project"} website preview`;
  image.loading = "lazy";
  image.decoding = "async";
  if (project.imgUrl) image.src = String(project.imgUrl);
  else image.hidden = true;

  const viewLabel = document.createElement("span");
  viewLabel.textContent = "View project ↗";
  link.append(image, viewLabel);

  const titleRow = document.createElement("div");
  titleRow.className = "project-title";

  const number = document.createElement("span");
  number.textContent = String(index + 1).padStart(2, "0");

  const title = document.createElement("h3");
  title.textContent = String(project.name ?? "Untitled project");
  titleRow.append(number, title);

  if (project.year) {
    const year = document.createElement("time");
    year.textContent = String(project.year);
    titleRow.append(year);
  }

  const description = document.createElement("p");
  description.textContent = String(project.description ?? "");

  const tags = document.createElement("div");
  tags.className = "tags";

  if (Array.isArray(project.tags)) {
    project.tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.textContent = String(tag);
      tags.append(tagElement);
    });
  }

  card.append(link, titleRow, description, tags);
  return card;
}

function renderProjects() {
  if (!projectGrid) return;

  const visibleProjects = showAllProjects ? projectData : projectData.slice(0, initialProjectCount);
  projectGrid.replaceChildren(...visibleProjects.map(createProjectCard));

  if (projectCount) projectCount.textContent = String(projectData.length).padStart(2, "0");

  if (viewMoreButton) {
    const hasMoreProjects = projectData.length > initialProjectCount;
    viewMoreButton.hidden = !hasMoreProjects;
    viewMoreButton.textContent = showAllProjects
      ? "Show fewer projects"
      : `View ${projectData.length - initialProjectCount} more projects`;
    viewMoreButton.setAttribute("aria-expanded", String(showAllProjects));
  }

  if (projectData.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "project-empty-state";
    emptyState.textContent = "No projects to show yet.";
    projectGrid.append(emptyState);
  }
}

viewMoreButton?.addEventListener("click", () => {
  showAllProjects = !showAllProjects;
  renderProjects();
});

renderProjects();