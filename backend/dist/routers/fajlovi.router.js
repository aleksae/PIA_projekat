"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fajlRouter = express_1.default.Router();
const multipart = require('connect-multiparty');
var EXT_RE = /(\.[_\-a-zA-Z0-9]{0,16}).*/g;
const multipartMiddleware = multipart({ uploadDir: './public',
    filename: function (filename, callback) {
        var name = filename.replace(EXT_RE, "");
        callback(name + '-YEAH.png');
    }
});
fajlRouter.route('/otpremanje').post(multipartMiddleware, (req, res) => {
    try {
        const file = req.files.uploads[0];
        let fileName = file.path;
        fileName = fileName.replace(/^.*[\\\/]/, '');
        res.json({
            message: 'File uploaded successfully.',
            fileName: fileName,
        });
    }
    catch (_a) {
        console.log("upload err");
    }
});
exports.default = fajlRouter;
//# sourceMappingURL=fajlovi.router.js.map