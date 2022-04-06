const canvas = <HTMLCanvasElement>document.querySelector(".imgCanvas")!;

// resize canvas to fit the image
export function fitCanvasSize(img: HTMLImageElement): void {
    const maxImageWidth = document.body.clientWidth * 0.9;

    // fine, doesn't have to get modified (for unusually shaped images)
    if (img.width < maxImageWidth && img.height < document.body.clientHeight) {
        canvas.width = img.width;
        canvas.height = img.height;
        return;
    }

    // defaults (in case the aspect ratio is 1:1)
    let width = Math.min(img.width, maxImageWidth);
    let height = width;

    if (img.width > img.height) height = width * 0.75; // 4:3
    else if (img.width < img.height) height = width * 1.25; // 4:5 (vertical images)

    canvas.width = width;
    canvas.height = height;
}
