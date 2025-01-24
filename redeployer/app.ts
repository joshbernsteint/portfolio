import express from 'express';
import { config } from 'dotenv';
import { spawnSync } from 'child_process';

function timeLog(str: string){
    console.log(`[${new Date().toISOString()}]: ${str}`);
}

config();
const PORT = process.env.PORT || 3000;
const dest_dir = process.env.DEST;

if(!dest_dir){
    throw "Destination directory not found!";
}

const app = express();
app.use(express.json());


/**
 * Repulls from GitHub
 * @returns `true` if the local repo was updatd. `false` if not.
 */
function rePull(){
    const pullFromGitHub = spawnSync('git pull | tail -1', {shell: true});
    const stdout = pullFromGitHub.stdout.toString();
    return stdout !== "Already up to date.\n"
}

//This is a comment
function runServer(){
    spawnSync('cd ../ && npm run build', {shell: true});
    spawnSync(`sudo cp -rf ../dist/* ${dest_dir}`, {shell: true});
}

let activeTimeout : NodeJS.Timeout | undefined = undefined;
const DELAY = 5000;

app.get('/', async (req,res) => {
    timeLog("Server pinged");
    res.send("Ping route!");
});

app.post('/github', async (req,res) => {
    if(activeTimeout){
        res.send("In Timeout, Please try again later.");
    }
    else if(rePull()){
        //Restart the servers
        const body = req.body;
        
        const branchName = body.ref.split('/')[2];
        if(branchName === "main"){
            console.log('|--------- Code Update Detected ---------|')
            timeLog("Reloading Server...")
            runServer();
            res.send("Server reloaded!");
            timeLog("Server reloaded");
            console.log('|--------- Code Update Complete ---------|\n')

            
            activeTimeout = setTimeout(() => {activeTimeout = undefined}, DELAY);
        }
        else res.send("Invalid branch name.");
    }
});

app.listen(PORT, () => {
    console.log("|--------- Server startup ---------|")
    timeLog("Rebuilding static files...")
    runServer();
    timeLog("Server Online!");
    console.log("|--------- Server startup complete ---------|\n")

});