import { Sort, SortLauncher } from "../../utils/sortLauncher";

class InsertionSort extends Sort {
  constructor() {
    super();
  }

  sort(length: number): void {
    for (let i: number = 0; i < length - 1; i++) {
      let j: number = 1;
      while (j >= 0 && this.arr[j] > this.arr[j + 1]) {
        this.swap(j, j + 1);
        j--;
      }
    }
  }
}

class InsertionSortLauncher extends SortLauncher {
  constructor() {
    super();
    this.dataStructure = new InsertionSort();
  }

  async execute() {
    await super.launch((answer: { length: string; data: string }) => {
      this.dataStructure.sort(Number(answer.length));
      console.log(this.dataStructure.arr);
    });
  }
}

export { InsertionSortLauncher as AlgorithmLauncher };
