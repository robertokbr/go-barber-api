
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));

const app = express_1.default();
app.get('/', (request, response) => {
  response.json({
    autor: 'Roberto Junior',
  });
});
app.listen(3333, () => {
  console.log('server starterd on port 3333!');
});
