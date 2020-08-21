(async () => {
  const path = require("path");
  const inquirer = require("inquirer");
  const menuList = await require("./utils/getList");
  const message = require("./config/message");
  const exampleDir = path.join(__dirname, "examples");

  class App {
    async play() {
      console.log("Let's test algorithm!");
      await this.chooseMenu();
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

    async chooseMenu() {
      const returnMessage = message.quitMessage;

      const answer = await inquirer.prompt(
        this.getMenu({
          menuList: Object.keys(menuList),
          returnMessage,
          promptName: "type",
          promptMessage: "choose algorithm type.",
        })
      );

      if (answer.type === returnMessage) process.exit(0);

      await this.chooseSubMenu(answer.type);
    }

    async chooseSubMenu(type) {
      const returnMessage = message.goBackMessage;

      const answer = await inquirer.prompt(
        this.getMenu({
          menuList: menuList[type],
          returnMessage,
          promptName: "algorithm",
          promptMessage: "choose algorithm.",
        })
      );

      if (answer.algorithm === returnMessage) {
        await this.chooseMenu();
        return;
      }

      this.executeAlgorithm(type, answer.algorithm);
    }

    async executeAlgorithm(type, algorithmName) {
      const Algorithm = require(path.join(exampleDir, type, algorithmName));

      const algorithm = new Algorithm();
      await algorithm.execute();

      await this.chooseMenu();
    }
  }

  const app = new App();
  app.play();
})();
