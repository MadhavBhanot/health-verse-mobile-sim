
// First check if the element exists and then use it as an HTMLElement
const fileInput = document.getElementById('prescription-upload');
if (fileInput) {
  (fileInput as HTMLElement).click();
}
