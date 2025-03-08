export async function loadComponent(elementId, component) {
  try {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = component;
      // Dispatch a custom event when component is loaded
      document.dispatchEvent(
        new CustomEvent("componentLoaded", { detail: elementId })
      );
    } else {
      console.error(`Element with id "${elementId}" not found`);
    }
  } catch (error) {
    console.error("Error loading component:", error);
  }
}
