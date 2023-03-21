## RM Notes
- To create this app: 
    PS C:\Users\rupal\work\repos> npx create-react-app rm-react-ts-students --template typescript 

    npm install bootstrap@5.0.0
    npm install axios
    npm install react-query
    
- To run:
    npm start

- To run with the VSC debugger:
    Select the project (rm-react-ts-students)
    Click "Run and Debug" [ the Play with the Bug icon ]
    At the top left see the "RUN AND DEBUG" 
        - Add Config, and choose our project
            Sample launch.json : 
                "version": "0.2.0",
                "configurations": [{
                    "type": "chrome",
                    "request": "launch",
                    "name": "Launch Chrome against localhost",
                    "url": "http://localhost:3000",
                    "webRoot": "${workspaceFolder}/rm-react-ts-students/src"
                }]
        - Choose "Launch Chrome" [against localhost]
        - Set breakpoints wherever


- Using React-Query:
    - https://www.carlrippon.com/getting-started-with-react-query-and-typescript/
    npm install react-query