import dva from 'dva';
import { message } from 'antd';
import './index.css';

// 1. Initialize
const app = dva({
    onError(e, dispatch) {
        console.log(e);
        dispatch({
            type: 'user/logout'
        });
        if (e.message == "Unauthorized") {
            message.warning("Please login");
        }
    }
});

app.model(require("./models/posts"));
app.model(require("./models/user"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
