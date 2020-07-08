(async () => {
  const path = require("path");
  const inquirer = require("inquirer");
  const menuList = await require("./utils/getList");
  const exampleDir = path.join(__dirname, "examples");

  class App {
    constructor() {
      this.goBackMessage = "Go Back.";
      this.quitMessage = "Quit.";
    }

    async play() {
      console.log("Let's test algorithm!");
      this.chooseMenu();
    }

    getMenu({ menuList, returnMessage, promptName, promptMessage }) {
      const choices = menuList.concat(returnMessage).map((value) => ({
        name: value,
        value,
      }));

      return {
        type: "rawlist",
        name: promptName,
        message: promptMessage,
        choices,
      };
    }

    chooseMenu() {
      const returnMessage = this.quitMessage;

      inquirer
        .prompt(
          this.getMenu({
            menuList: Object.keys(menuList),
            returnMessage,
            promptName: "type",
            promptMessage: "choose algorithm type.",
          })
        )
        .then((answers) => {
          if (answers.type === returnMessage) process.exit(0);

          this.chooseSubMenu(answers.type);
        });
    }

    chooseSubMenu(type) {
      const returnMessage = this.goBackMessage;

      inquirer
        .prompt(
          this.getMenu({
            menuList: menuList[type],
            returnMessage,
            promptName: "algorithm",
            promptMessage: "choose algorithm.",
          })
        )
        .then((answers) => {
          if (answers.algorithm === returnMessage) {
            this.chooseMenu();
            return;
          }

          this.executeAlgorithm(type, answers.algorithm);
        });
    }

    async executeAlgorithm(type, algorithmName) {
      const Algorithm = require(path.join(exampleDir, type, algorithmName));

      const algorithm = new Algorithm();
      await algorithm.execute();

      this.chooseMenu();
    }
  }

  const app = new App();
  app.play();
})();
