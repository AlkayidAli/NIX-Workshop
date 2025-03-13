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

  //note management object
  const notesManager = {
    notes: [],
    currentFilter: "all",

    getFilteredNotes() {
      switch (this.currentFilter) {
        case "active":
          return this.notes.filter((note) => !note.isCompleted);
        case "completed":
          return this.notes.filter((note) => note.isCompleted);
        default:
          return this.notes;
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

    // render notes
    renderNotes() {
      const filteredNotes = this.getFilteredNotes();
      noteList.innerHTML = filteredNotes
        .map((note) => this.createNoteHTML(note))
        .join("");
      this.setupNoteButtons();
      this.updateFilterButtons();
    },

    //note buttons
    setupNoteButtons() {
      noteList.querySelectorAll(".note-container").forEach((noteEl) => {
        const id = parseInt(noteEl.dataset.id);
        const note = this.notes.find((n) => n.id === id);

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
    // Update the updateFilterButtons method
    updateFilterButtons() {
      const allBtn = document.getElementById("allFilterBtn");
      const activeBtn = document.getElementById("activeFilterBtn");
      const completedBtn = document.getElementById("completedFilterBtn");

      [allBtn, activeBtn, completedBtn].forEach((btn) => {
        btn.classList.remove("active");
        if (btn.id === `${this.currentFilter}FilterBtn`) {
          btn.classList.add("active");
        }
      });
    },

    // Update loadNotes to set initial filter
    addNote(title, description) {
      const note = {
        id: Date.now(),
        title: title,
        description: description,
        isCompleted: false,
        style: this.getNoteStyle(), // Style is saved with the note
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
        style: note.style || this.getNoteStyle(), // Use existing style or create new one
      }));
      this.currentFilter = "all";
      this.renderNotes();
    },
  };

  // Event Listeners
  addNoteBtn.addEventListener("click", () => {
    noteForm.reset();
    delete noteForm.dataset.editId;
    modal.style.display = "flex";
  });

  // Add note form submit handler
  // Fix the form submit handler
  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("form-title").value;
    const description = document.getElementById("form-description").value;

    if (noteForm.dataset.editId) {
      // Edit existing note
      const noteId = parseInt(noteForm.dataset.editId);
      const note = notesManager.notes.find((n) => n.id === noteId);
      if (note) {
        note.title = title;
        note.description = description;
        notesManager.saveNotes();
        notesManager.renderNotes();
      }
    } else {
      // Add new note
      notesManager.addNote(title, description);
    }

    modal.style.display = "none";
    noteForm.reset();
    delete noteForm.dataset.editId;
  });

  // Show modal when clicking Add Note button
  addNoteBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Cancel button handler
  document.getElementById("form-cancel-btn").addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Load saved notes on startup
  notesManager.loadNotes();

  // Add filter button event listeners
  document.getElementById("allFilterBtn").addEventListener("click", () => {
    notesManager.currentFilter = "all";
    notesManager.renderNotes();
  });

  document.getElementById("activeFilterBtn").addEventListener("click", () => {
    notesManager.currentFilter = "active";
    notesManager.renderNotes();
  });

  document
    .getElementById("completedFilterBtn")
    .addEventListener("click", () => {
      notesManager.currentFilter = "completed";
      notesManager.renderNotes();
    });
}); // End of DOMContentLoaded
