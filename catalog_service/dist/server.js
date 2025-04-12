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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StartServer;
const express_app_1 = __importDefault(require("./express.app"));
const PORT = process.env.PORT || 3000;
function StartServer() {
    return __awaiter(this, void 0, void 0, function* () {
        express_app_1.default.listen(PORT, () => {
            console.log(`Application running on port ${PORT}`);
        });
    });
}
StartServer().then(() => {
    console.log('Server is up...');
});
