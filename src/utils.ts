const sharp = require("sharp");

export async function processarImagem(base64String) {
    const base64Data = base64String.replace("/^data:image\/\w+;base64,/", "");
    const buffer = Buffer.from(base64Data, "base64");

    const outputBuffer = await sharp(buffer).resize(800).jpeg({ quality: 70 }).toBuffer();
    const outputBase64 = outputBuffer.toString("base64");
    
    const dataUri = `data:image/jpeg;base64,${outputBase64}`;
    return dataUri;
}