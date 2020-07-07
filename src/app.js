(async () => {
  const inquirer = require("inquirer");
  const menuList = await require("./utils/getList");

  const goBackMessage = "Go back.";
  const quitMessage = "Quit.";

  const getMenu = () => {
    const choices = Object.keys(menuList)
      .concat(quitMessage)
      .map((value) => ({
        name: value,
        value,
      }));

    return {
      type: "rawlist",
      name: "type",
      message: "choose algorithm type.",
      choices,
    };
  };

  const getSubMenu = (type) => {
    const choices = menuList[type].concat(goBackMessage).map((value) => ({
      name: value,
      value,
    }));

    return {
      type: "rawlist",
      name: "algorithm",
      message: "choose algorithm.",
      choices,
    };
  };

  async function main() {
    console.log("Let's test algorithm!");
    chooseMenu();
  }

  function chooseMenu() {
    inquirer.prompt(getMenu()).then((answers) => {
      if (answers.type === quitMessage) process.exit(0);

      chooseSubMenu(answers.type);
    });
  }

  function chooseSubMenu(type) {
    inquirer.prompt(getSubMenu(type)).then((answers) => {
      if (answers.algorithm === goBackMessage) {
        chooseMenu();
        return;
      }

      executeAlgorithm(type, answers.algorithm);
    });
  }

  function executeAlgorithm(type, algorithm) {
    console.log("executeAlgorithm()");
    console.log(type, algorithm);
  }

  main();
})();
