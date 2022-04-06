// RGB-value : char
const CHARS = new Map<number, string>([
    [0, "@"],
    [50, "#"],
    [70, "8"],
    [100, "&"],
    [130, "o"],
    [160, ":"],
    [180, "*"],
    [200, "."],
    [230, " "],
]);

function getASCIIindex(rgbVal: number): number {
    let prev = 0;
    for (const key of CHARS.keys()) {
        if (rgbVal > key) {
            prev = key;
            continue;
        }

        break;
    }

    return prev;
}

const PREF_WIDTH = 150;

export default function convertToAscii(img: ImageData): string {
    let data = [];
    for (let i = 0; i < img.data.length; i += 4) {
        data.push(img.data[i]);
    }

    const pixelWidth = Math.ceil(img.width / PREF_WIDTH);
    const ratio = img.height / img.width;
    const asciiHeight = (PREF_WIDTH * ratio) / 2;
    const pixelHeight = Math.ceil(img.height / asciiHeight);

    let result = "";
    for (let j = 0; j < img.height; j += pixelHeight) {
        for (let i = 0; i < img.width; i += pixelWidth) {
            const pixel = data[img.width * j + i];
            const ascii = CHARS.get(getASCIIindex(pixel));
            result += ascii;
        }

        result += "\n";
    }

    return result;
}
