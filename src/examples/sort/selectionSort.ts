import inquirer from "inquirer";

export class SelectionSort {
  arr: Array<number>;

  constructor() {
    this.arr = [];
  }

  swap(a: number, b: number): void {
    let temp = this.arr[a];
    this.arr[a] = this.arr[b];
    this.arr[b] = temp;
  }

  sort(n: number): void {
    let [index, min]: number[] = [0, 0];

    for (let i: number = 0; i < n; i++) {
      min = Number.MAX_SAFE_INTEGER;
      for (let j: number = i; j < n; j++) {
        if (min > this.arr[j]) {
          min = this.arr[j];
          index = j;
        }
      }
      this.swap(i, index);
    }
  }
}

class SelectionSortLauncher {
  dataStructure: SelectionSort;

  constructor() {
    this.dataStructure = new SelectionSort();
  }

  execute(): Promise<void> {
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

      this.dataStructure.sort(Number(answer.length));
      console.log(this.dataStructure.arr);

      resolve();
    });
  }
}

export { SelectionSortLauncher as AlgorithmLauncher };
