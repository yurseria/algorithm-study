import { Sort, SortLauncher } from "../../utils/sortLauncher";

class InsertionSort extends Sort {
  constructor() {
    super();
  }

  sort(n: number): void {
    for (let i: number = 0; i < n - 1; i++) {
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
    });
  }
}

export { InsertionSortLauncher as AlgorithmLauncher };
