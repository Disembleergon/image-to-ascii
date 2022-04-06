import '../styles/styles.css'
import convertToAscii from "./convert";
import { fitCanvasSize } from "./imagemanip";

// get canvas & ctx
let canvas = <HTMLCanvasElement>document.querySelector(".imgCanvas")!;
const ctx = canvas.getContext("2d")!;

// draw transparent "image preview"
fitCanvasSize(new Image(document.body.clientWidth)); // "dummy" image, for preview
ctx.fillStyle = "rgba(200, 200, 200, 0.2)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ------ elements and events --------
const asciiPreview = document.querySelector(".asciiPreview")!;

const imagePicker = <HTMLInputElement>document.getElementById("upload-image")!;
imagePicker.addEventListener("change", onImageUpload);

document.addEventListener("paste", (e) => {
    imagePicker.files = e.clipboardData?.files!;
    imagePicker.dispatchEvent(new Event("change"));
});

function onImageUpload(e: Event): void {
    const target = <HTMLInputElement>e!.target;
    const file = target.files![0];
    const fileBlob = URL.createObjectURL(file);

    let img = new Image();
    img.src = fileBlob;

    img.addEventListener("load", () => {
        URL.revokeObjectURL(fileBlob);

        fitCanvasSize(img);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        startImageConvertion();
    });
}

function startImageConvertion(): void {
    // grayscale image
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)!;
    const grayscaledData = graycaleImage(imgData);

    const ascii = convertToAscii(grayscaledData);
    asciiPreview.textContent = ascii;
}

function graycaleImage(imgData: ImageData): ImageData {
    const data = imgData.data;

    // grayscale data with averaging algorithm
    for (let i = 0; i < data.length; i += 4) {
        const average = (data[i] + data[i + 1] + data[i + 2]) / 3;

        data[i] = average; // r
        data[i + 1] = average; // g
        data[i + 2] = average; // b
        // skip alpha
    }

    return new ImageData(data, imgData.width, imgData.height);
}
