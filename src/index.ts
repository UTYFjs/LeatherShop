import './styles.scss';
//import { test } from './test';
import { AppView } from './ts/controllers/AppView'
import { data } from './ts/modules/data'
import { App } from './ts/controllers/App'

//const app = new AppView(data);

const app = new App();
app.start();

//const img = require('./assets/img/belt_red_vintage.jpg');
//test();

//document.body.div.innerHTML = `
//<img src="./assets/img/belt_red_vintage.jpg" alt="belt_red_vintage">`;
//document.body.innerHTML = `
//<img src="./img/belt_red_vintage.jpg" alt="belt_red_vintage22">`