export function loadComponent(elementId, component) {
  try {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = component;
    } else {
      console.error(`Element with id "${elementId}" not found`);
    }
  } catch (error) {
    console.error('Error loading component:', error);
  }
}