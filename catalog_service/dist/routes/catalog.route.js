"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/product', (req, res, next) => {
    res.status(201).json({});
});
exports.default = router;
