import React from 'react';
import App from './App.js';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {createRoot} from 'react-dom/client';
import zhCN from 'antd/locale/zh_CN';
import './style.css';
import {ConfigProvider} from "antd";

dayjs.locale('zh-cn');

createRoot(document.getElementById('root')!).render(
    <ConfigProvider locale={zhCN}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
    </ConfigProvider>,
);
