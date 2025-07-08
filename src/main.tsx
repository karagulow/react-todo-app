import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
const root = ReactDOM.createRoot(container);

root.render(
	<Router>
		<App />
	</Router>
);
