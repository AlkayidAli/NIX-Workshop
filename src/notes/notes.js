import "./notes.scss";
import "../styles/_variables.scss";
import { loadComponent } from "../utils/loadComponents";
import headerHtml from "../components/common/header/header.html";
import footerHtml from "../components/common/footer/footer.html";
import "../components/common/header/header.scss";
import "../components/common/footer/footer.scss";
import "../components/common/header/header.js";
// img import
import plusSymbol from "../images/icons/plus-symbol.png";
import editIcon from "../images/icons/edit-pencil.png";
import statusIconEmpty from "../images/icons/done_empty.png";
import statusIconFull from "../images/icons/done_full.png";
import trashIcon from "../images/icons/trash.png";

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", headerHtml);
  loadComponent("footer", footerHtml);

  // elements
  const modal = document.querySelector(".modal");
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteForm = document.getElementById("noteForm");
  const noteList = document.querySelector(".note-list-container");
  const allFilterBtn = document.getElementById("allFilterBtn");
  const activeFilterBtn = document.getElementById("activeFilterBtn");
  const completedFilterBtn = document.getElementById("completedFilterBtn");

  //note management object
  const notesManager = {
    notes: [],
    currentFilter: "all",
    selectedColor: "#fdffa3",

    getNoteStyle() {
      const rotations = [-2, -1, 0, 1, 2];
      return {
        backgroundColor: this.selectedColor,
        transform: `rotate(${
          rotations[Math.floor(Math.random() * rotations.length)]
        }deg)`,
      };
    },

    updateColorSelector() {
      document.querySelectorAll(".color-circle").forEach((circle) => {
        const color = circle.dataset.color;
        circle.style.backgroundColor = color;
        circle.classList.toggle("selected", color === this.selectedColor);
      });
    },

    editNote(note) {
      document.getElementById("form-title").value = note.title;
      document.getElementById("form-description").value = note.description;
      this.selectedColor = note.style.backgroundColor;
      this.updateColorSelector();
      modal.style.display = "flex";
      noteForm.dataset.editId = note.id;
    },

    getFilteredNotes() {
      switch (this.currentFilter) {
        case "active":
          return this.notes.filter((note) => !note.isCompleted);
        case "completed":
          return this.notes.filter((note) => note.isCompleted);
        default:
          return [...this.notes];
      }
    },
    renderNotes() {
      const filteredNotes = this.getFilteredNotes();
      noteList.innerHTML = filteredNotes
        .map((note) => this.createNoteHTML(note))
        .join("");
      this.setupNoteButtons();
      this.updateFilterButtons();
    },

    // createNoteHTML for the note cointainer
    createNoteHTML(note) {
      return `
        <div class="note-container ${
          note.isCompleted ? "completed" : ""
        }" data-id="${note.id}" 
             style="background-color: ${
               note.style.backgroundColor
             }; transform: ${note.style.transform}">
          <div class="note-body">
            <p class="note-title ${note.isCompleted ? "completed" : ""}">${
        note.title
      }</p>
            <p class="not-description ${note.isCompleted ? "completed" : ""}">${
        note.description
      }</p>
          </div>
          <div class="note-footer">
            <button class="note-footer-button edit-btn">
              <img src="${editIcon}" alt="edit icon" />
            </button>
            <button class="note-footer-button status-btn">
              <img src="${
                note.isCompleted ? statusIconFull : statusIconEmpty
              }" alt="status icon" />
            </button>
            <button class="note-footer-button delete-btn">
              <img src="${trashIcon}" alt="trash icon" />
            </button>
          </div>
        </div>
      `;
    },

    renderNotes() {
      const filteredNotes = this.getFilteredNotes();
      noteList.innerHTML = filteredNotes
        .map((note) => this.createNoteHTML(note))
        .join("");
      this.setupNoteButtons();
      this.updateFilterButtons();
    },

    editNote(note) {
      document.getElementById("form-title").value = note.title;
      document.getElementById("form-description").value = note.description;
      this.selectedColor = note.style.backgroundColor;
      this.updateColorSelector();
      modal.style.display = "flex";
      noteForm.dataset.editId = note.id;
    },
    setupNoteButtons() {
      noteList.querySelectorAll(".note-container").forEach((noteEl) => {
        const id = parseInt(noteEl.dataset.id);
        const note = this.notes.find((n) => n.id === id);
        if (!note) return;

        const editBtn = noteEl.querySelector(".edit-btn");
        const statusBtn = noteEl.querySelector(".status-btn");
        const deleteBtn = noteEl.querySelector(".delete-btn");

        editBtn.replaceWith(editBtn.cloneNode(true));
        statusBtn.replaceWith(statusBtn.cloneNode(true));
        deleteBtn.replaceWith(deleteBtn.cloneNode(true));

        // Add new event listeners
        noteEl
          .querySelector(".edit-btn")
          .addEventListener("click", () => this.editNote(note));
        noteEl
          .querySelector(".status-btn")
          .addEventListener("click", () => this.toggleStatus(note));
        noteEl
          .querySelector(".delete-btn")
          .addEventListener("click", () => this.deleteNote(note));
      });
    },

    // edit note
    editNote(note) {
      document.getElementById("form-title").value = note.title;
      document.getElementById("form-description").value = note.description;
      modal.style.display = "flex";
      noteForm.dataset.editId = note.id;
    },

    // status
    toggleStatus(note) {
      note.isCompleted = !note.isCompleted;
      this.saveNotes();
      this.renderNotes();
    },

    // Delete note
    deleteNote(note) {
      this.notes = this.notes.filter((n) => n.id !== note.id);
      this.saveNotes();
      this.renderNotes();
    },

    // Save to
    saveNotes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },

    // Load from localStorage
    updateFilterButtons() {
      const allBtn = document.getElementById("allFilterBtn");
      const activeBtn = document.getElementById("activeFilterBtn");
      const completedBtn = document.getElementById("completedFilterBtn");

      // Get counts for each filter
      const allCount = this.notes.length;
      const activeCount = this.notes.filter((note) => !note.isCompleted).length;
      const completedCount = this.notes.filter(
        (note) => note.isCompleted
      ).length;

      allBtn.innerHTML = `All notes <span style="color: inherit">(${allCount})</span>`;
      activeBtn.innerHTML = `Active <span style="color: inherit">(${activeCount})</span>`;
      completedBtn.innerHTML = `Completed <span style="color: inherit">(${completedCount})</span>`;

      [allBtn, activeBtn, completedBtn].forEach((btn) => {
        btn.classList.remove("active");
      });

      switch (this.currentFilter) {
        case "active":
          activeBtn.classList.add("active");
          break;
        case "completed":
          completedBtn.classList.add("active");
          break;
        default:
          allBtn.classList.add("active");
      }
    },

    addNote(title, description) {
      const note = {
        id: Date.now(),
        title: title,
        description: description,
        isCompleted: false,
        style: this.getNoteStyle(),
      };
      this.notes.unshift(note);
      this.saveNotes();
      this.renderNotes();
    },

    loadNotes() {
      const saved = localStorage.getItem("notes");
      const savedNotes = saved ? JSON.parse(saved) : [];
      // Ensure each note has a style
      this.notes = savedNotes.map((note) => ({
        ...note,
        style: note.style || this.getNoteStyle(),
      }));
      this.currentFilter = "all";
      this.renderNotes();
    },
  };

  // Event Listeners
  document.querySelectorAll(".color-circle").forEach((circle) => {
    circle.addEventListener("click", () => {
      notesManager.selectedColor = circle.dataset.color;
      notesManager.updateColorSelector();
    });
  });

  addNoteBtn.addEventListener("click", () => {
    noteForm.reset();
    delete noteForm.dataset.editId;
    notesManager.selectedColor = "#fdffa3"; // Reset to default color
    notesManager.updateColorSelector();
    modal.style.display = "flex";
  });

  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("form-title").value.trim();
    const description = document
      .getElementById("form-description")
      .value.trim();

    if (!title || !description) {
      alert("Please fill in both title and description");
      return;
    }

    if (noteForm.dataset.editId) {
      const noteId = parseInt(noteForm.dataset.editId);
      const note = notesManager.notes.find((n) => n.id === noteId);
      if (note) {
        note.title = title;
        note.description = description;
        note.style.backgroundColor = notesManager.selectedColor;
        notesManager.saveNotes();
        notesManager.renderNotes();
      }
    } else {
      notesManager.addNote(title, description);
    }

    modal.style.display = "none";
    noteForm.reset();
    delete noteForm.dataset.editId;
  });

  // Show modal when clicking add Note button
  addNoteBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Cancel button handler
  document.getElementById("form-cancel-btn").addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
    noteForm.reset();
  });

  //close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      noteForm.reset();
    }
  });

  // Load saved notes on startup
  try {
    notesManager.loadNotes();
  } catch (error) {
    console.error("Error loading notes:", error);
    localStorage.removeItem("notes");
    notesManager.notes = [];
    notesManager.renderNotes();
  }

  // Add filter button event listeners
  allFilterBtn.addEventListener("click", () => {
    notesManager.currentFilter = "all";
    notesManager.renderNotes();
  });

  activeFilterBtn.addEventListener("click", () => {
    notesManager.currentFilter = "active";
    notesManager.renderNotes();
  });

  completedFilterBtn.addEventListener("click", () => {
    notesManager.currentFilter = "completed";
    notesManager.renderNotes();
  });
});
