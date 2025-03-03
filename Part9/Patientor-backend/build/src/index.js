"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoseRoutes_1 = __importDefault(require("./routes/diagnoseRoutes"));
const patientsRoutes_1 = __importDefault(require("./routes/patientsRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static('dist'));
app.use((0, cors_1.default)());
// const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/diagnose', diagnoseRoutes_1.default);
app.use('/api/patients', patientsRoutes_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} from .env ${process.env.PORT}`);
});
