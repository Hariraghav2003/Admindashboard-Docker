//Style for the webPage
function Body() {
  const zoomLevel = 0.9;
  document.body.style.transform = `scale(${zoomLevel})`;
  document.body.style.transformOrigin = "top left";
  document.body.style.width = `${100 / zoomLevel}vw`;
  document.body.style.height = `${100 / zoomLevel}vh`;
  document.body.style.overflow = "hidden";
}
export default Body;
