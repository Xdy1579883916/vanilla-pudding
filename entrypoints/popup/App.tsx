import {useState} from 'react';
import './App.css';
import {List, Switch} from "antd";
import {getBackgroundService} from "@/lib/rpc/bg_service";

function App() {
    const [data, setData] = useState([]);

    const backgroundService = getBackgroundService()

    function getAll() {
        return backgroundService.getAllUserScripts().then(res => {
            // console.log("res", res)
            setData(res);
        })
    }

    async function handleTrigger(item) {
        await backgroundService.setUserScriptEnabled(item.id, !item.enabled)
        await getAll()
    }

    return (
        <>
            <List
                size="small"
                bordered
                dataSource={data}
                renderItem={
                    (item) => (
                        <List.Item className="">
                            <Switch checked={item.enabled} onClick={() => handleTrigger(item)}></Switch>
                            {item.name}
                        </List.Item>
                    )}
            />
        </>
    );
}

export default App;
