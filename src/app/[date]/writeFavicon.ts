export const writeFavicon = (text: string) => {
  const favicon = document.querySelector("link[rel=\"icon\"]") as HTMLLinkElement;
  if (!favicon) {
    return;
  }

  const faviconSize = 64;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  const img = document.createElement("img");
  img.src = favicon.href;

  img.onload = () => {
    canvas.width = faviconSize;
    canvas.height = faviconSize;
    context.fillStyle = "#F76B67";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "42px 'helvetica', Assistant";
    context.fillStyle = "#FFFFFF";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width - faviconSize / 2, faviconSize / 2);
    favicon.href = canvas.toDataURL("image/png");
  };
};
