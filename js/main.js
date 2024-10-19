import { data } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const mainElement = document.querySelector("main");

  function hideAllDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown");
    const characters = document.querySelectorAll(".character");

    dropdowns.forEach(dropdown => dropdown.classList.remove("visible"));
    characters.forEach(character => character.classList.remove("highlight"));
  }

  // Method 1: Using <template> and cloneNode()
  function renderCharactersTemplate() {
    const heading = document.createElement("h2");
    heading.textContent = "Method 1: Using <template> and cloneNode()";
    mainElement.appendChild(heading);

    const template = document.querySelector("#character-template");

    data.forEach(item => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".name").textContent = item.name;
      clone.querySelector(".role").textContent = `Role: ${item.role}`;
      clone.querySelector(".family").textContent = `Family: ${item.family}`;
      clone.querySelector(".origin").textContent = `Origin: ${item.origin}`;

      const nameElement = clone.querySelector(".name");
      const dropdown = clone.querySelector(".dropdown");
      const characterElement = clone.querySelector(".character");

      nameElement.addEventListener("click", () => {
        hideAllDropdowns();
        dropdown.classList.toggle("visible");
        characterElement.classList.toggle("highlight");
      });

      mainElement.appendChild(clone);
    });
  }

  // Method 2: Using document.createElement()
  function renderCharactersCreateElement() {
    const heading = document.createElement("h2");
    heading.textContent = "Method 2: Using document.createElement()";
    mainElement.appendChild(heading);

    data.forEach(item => {
      const characterDiv = document.createElement("div");
      characterDiv.classList.add("character");

      const nameElement = document.createElement("h2");
      nameElement.textContent = item.name;
      nameElement.classList.add("name");
      characterDiv.appendChild(nameElement);

      const dropdown = document.createElement("div");
      dropdown.classList.add("dropdown");
      dropdown.innerHTML = `
        <p>Role: ${item.role}</p>
        <p>Family: ${item.family}</p>
        <p>Origin: ${item.origin}</p>
      `;
      characterDiv.appendChild(dropdown);

      nameElement.addEventListener("click", () => {
        hideAllDropdowns();
        dropdown.classList.toggle("visible");
        characterDiv.classList.toggle("highlight");
      });

      mainElement.appendChild(characterDiv);
    });
  }

  // Method 3: Using innerHTML with map().join()
  function renderCharactersInnerHTML() {
    const heading = document.createElement("h2");
    heading.textContent = "Method 3: Using innerHTML with map().join()";
    mainElement.appendChild(heading);

    const innerHTMLContent = data.map(item => `
      <div class="character">
        <h2 class="name">${item.name}</h2>
        <div class="dropdown">
          <p>Role: ${item.role}</p>
          <p>Family: ${item.family}</p>
          <p>Origin: ${item.origin}</p>
        </div>
      </div>
    `).join("");

    mainElement.innerHTML += innerHTMLContent;

    document.querySelectorAll(".name").forEach(nameElement => {
      const characterElement = nameElement.parentElement;
      nameElement.addEventListener("click", () => {
        hideAllDropdowns();
        nameElement.nextElementSibling.classList.toggle("visible");
        characterElement.classList.toggle("highlight");
      });
    });
  }

  renderCharactersTemplate();
  renderCharactersCreateElement();
  renderCharactersInnerHTML();
});

