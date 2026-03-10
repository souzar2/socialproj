"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processarImagem = processarImagem;
const sharp = require("sharp");
function processarImagem(base64String) {
    return __awaiter(this, void 0, void 0, function* () {
        const base64Data = base64String.replace("/^data:image\/\w+;base64,/", "");
        const buffer = Buffer.from(base64Data, "base64");
        const outputBuffer = yield sharp(buffer).resize(800).jpeg({ quality: 70 }).toBuffer();
        const outputBase64 = outputBuffer.toString("base64");
        const dataUri = `data:image/jpeg;base64,${outputBase64}`;
        return dataUri;
    });
}
