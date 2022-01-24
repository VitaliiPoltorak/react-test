import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import './index.css';
import axios from "axios";



ReactDOM.render(
  <React.StrictMode>
    <App />

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// try {
//     const row = await form.validateFields();
//     const newData = [...data];
//     const index = newData.findIndex((item) => user === item.user);
//
//     const item = newData[index];
//     newData.splice(index, 1, {...item, ...row});
//     setData(newData);
//     setEditingKey('');
//
//     const response = await axios.patch(
//         `https://gorest.co.in/public/v1/users/${user.id}?access-token=83fcc7cc60d2fc306303122bc0170a6b59b97b11d9b6e77198a1fdb50eb4ae91`,
//
//         {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             gender: user.gender,
//             status: user.status
//         });
//     console.log('👉 Returned data:', response);
//
//
// }