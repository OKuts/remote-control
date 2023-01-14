"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMouseActionMessage = void 0;
const nut_js_1 = require("@nut-tree/nut-js");
const getMouseActionMessage = async (action, delta = 0) => {
    let dx = 0;
    let dy = 0;
    switch (action) {
        case 'right':
            dx = delta;
            break;
        case 'left':
            dx = -delta;
            break;
        case 'up':
            dy = -delta;
            break;
        case 'down':
            dy = delta;
            break;
    }
    const { x, y } = await nut_js_1.mouse.getPosition();
    const newX = x + dx;
    const newY = y + dy;
    await nut_js_1.mouse.setPosition({ x: newX, y: newY });
    return `${newX},${newY}`;
};
exports.getMouseActionMessage = getMouseActionMessage;
