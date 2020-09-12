import inquirer from "inquirer";

export class Sort {
  arr: Array<number>;

  constructor() {
    this.arr = [];
  }

  swap(a: number, b: number): void {
    let temp = this.arr[a];
    this.arr[a] = this.arr[b];
    this.arr[b] = temp;
  }

  sort(length: number): void {}
}

export class SortLauncher {
  dataStructure: Sort;

  constructor() {
    this.dataStructure = new Sort();
  }

  launch(callback: Function): Promise<void> {
    return new Promise(async (resolve) => {
      const answer = (await inquirer.prompt([
        {
          type: "input",
          name: "length",
          message: "Input number length to sort.",
          validate: (value: string) => {
            var pass = value.match(/^(\d+)$/);
            if (pass) return true;

            return "Please enter a valid value.";
          },
        },
        {
          type: "input",
          name: "data",
          message:
            "Input data to sort.\n  There must be a space between each letter.\n  e.g. 6 3 8 1 9 4\n ",
          validate: (value: string) => {
            var pass = value.match(/^((\d+) )+(\d+|\))$/);
            if (pass) return true;

            return "Please enter a valid value.";
          },
        },
      ])) as {
        length: string;
        data: string;
      };

      this.dataStructure.arr = answer.data
        .split(" ")
        .map((data) => Number(data));

      if (this.dataStructure.arr.length !== Number(answer.length)) {
        console.error("Wrong length!");
        resolve();
        return;
      }

      callback(answer);

      resolve();
    });
  }

  async execute() {
    await this.launch(() => {});
  }
}
