import { Button, FormGroup, MenuItem, Tab, Tabs, TextField, Typography } from "@mui/material";
import axios from 'axios';

import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, useEffect, useState } from "react";
import { responseSize, Timer } from "../../../utils/RequesterUtils.ts";
import ConstrictedLabel from "../../../components/ConstrictedLabel.tsx";
import { LocalStorage } from "../../../utils/Storage.ts";

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';

const RequestTypes : {value: Method, label: string, color: string}[] = [
    {value: 'get', label: "GET", color: "primary"},
    {value: 'post', label: "POST", color: "warning"},
    {value: 'put', label: "PUT", color: "secondary"},
    {value: 'patch', label: "PATCH", color: "success"},
    {value: 'delete', label: "DELETE", color: "error"},
    {value: 'head', label: "HEAD", color: "pink"},
    {value: 'options', label: "OPTIONS", color: "magenta"},
];

const localKeys : {active : string} = {
    active: 'active_queries',
}

type TabQuery = {
    url: string,
    method: Method,
    result?: {
        code: number,
        response: string,
    },
}

const emptyTab : TabQuery = {
    url: "",
    method: 'get',
}

export default function Requester(){

    
    const [tabs, setTabs] = useState<TabQuery[]>(LocalStorage.get(localKeys.active) || [structuredClone(emptyTab)]);
    const [activeTabNumber, setActiveTab] = useState<number>(0);
    const activeTab = tabs[activeTabNumber];

    useEffect(() => {
        LocalStorage.set<TabQuery[]>(localKeys.active, tabs);
    }, [tabs]);

    const updateUrl = (event: ChangeEvent<HTMLInputElement>) => {
        setTabs(t => {
            t[activeTabNumber].url = event.target.value;
            return [...t];
        });
    };

    const updateMethod = (event: ChangeEvent<HTMLInputElement>) => {
        setTabs(t => {
            t[activeTabNumber].method = event.target.value as Method;
            return [...t];
        });
    };

    async function makeRequest(){
        const query = tabs[activeTabNumber];
        try {

            // Time the request
            const timer = new Timer();
            timer.start();
            const result = await axios({
                method: query.method, 
                url: query.url,
            });
            timer.end();
            console.log(result);
            console.log(Timer.deltaString(timer.delta), responseSize(result));
            
            setTabs(t => {
                t[activeTabNumber].result = {
                    code: result.status,
                    response: result.data,
                };
                return [...t];
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{padding: '2rem'}}>
            <Tabs value={activeTabNumber} onChange={(_, v) => {
                if(v >= tabs.length)
                    setTabs(t => [...t, structuredClone(emptyTab)]);
                setActiveTab(v);
            }}>
                {
                    tabs.map((e,i) => (
                        <Tab key={i} label={<ConstrictedLabel label={e.url || "Untitled Query"}/>} sx={{textTransform: 'none'}}/>
                    ))
                }
                <Tab icon={<AddIcon fontSize="small"/>} iconPosition="start" />
            </Tabs>
            <div style={{padding: '1rem'}}>
                <FormGroup row >
                    <TextField select value={activeTab.method} label="Request Type" sx={{minWidth: '150px'}} onChange={updateMethod}>
                        {
                            RequestTypes.map((e,i) => (
                                <MenuItem key={i} value={e.value}>
                                    <Typography color={e.color} fontWeight={'bold'}>
                                        {e.label}
                                    </Typography>
                                </MenuItem>
                            ))
                        }
                    </TextField>
                    <TextField variant="filled" label="Request URL" sx={{flexGrow: 1}} value={activeTab.url} onChange={updateUrl}/>
                    <Button variant="contained" sx={{marginLeft: 1, minWidth: '100px', fontSize: 'larger'}} onClick={makeRequest}>Send</Button>
                </FormGroup>
            </div>
            {activeTab.result && activeTab.result.code}
        </div>
    )
}