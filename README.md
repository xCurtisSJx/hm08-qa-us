# Sprint 8 Project

## The objective of my project is to create test to check the functionality of Urban Routes

## Install Instructions 

### Visual Studio
1. Got to code.visualstudio.com 
2. Download the proper version for your computer

### Git and GitHub
1. Install Git
2. Link TripleTen account to GitHub using link provided in the project instructions 
3. Open GitBash and create the projects directory
* cd ~                      - Return to home directory
* mkdir projects            - Create a folder called projects
* cd projects               - change directory into the new projects folder
4. In GetBash, clone the repository hm08-qa-us
* // if you are using HTTPS - git clone https://github.com/username/hm08-qa-us.git
* // If you are using SSH   - git clone git@github.com:username/hm08-qa-us.git
5. Installing NPM
* Inside GitBash in the projects hm08-qa-us folder use command npm install
6. Open VS Code. Select file > Open folder > hm08-qa-us

## Test Instructions 
* In wdio.config.js (within the hm08-qa-us folder), replace the URL in baseUrl: with the active server provided to update server

### Complete 9 Testing Tasks plus a README file
1. Test setting the address function.
2. Test selecting the Supportive plan function.
3. Test filling in the phone number function.
4. Test adding a credit card function.
5. Test writing a message to the driver function.
6. Test ordering a blanket and handkerchiefs feature.
7. Test ordering ice cream feature.
8. Test that the car search modal appears.
9. Test that the waiting for the driver info appears in the modal.
- Run test using the npm run wdio command in the terminal inside the project file
10. Write a README.md file. 
// the file should include
* Projects name
* Description of the project
* Description of the technologies and techniques used
* & instructions on how to run the tests
       
## Documentation sources used
* DevTools

## Commit and push   //inside the terminal in the projects folder use the commands below in this order
1. git add -A
2. git commit -m "Project 7"
3. git push -u origin main 