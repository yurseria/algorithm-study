import { Sort, SortLauncher } from "../../utils/sortLauncher";

export class SelectionSort extends Sort {
  constructor() {
    super();
  }

  sort(length: number): void {
    let [index, min]: number[] = [0, 0];

    for (let i: number = 0; i < length; i++) {
      min = Number.MAX_SAFE_INTEGER;
      for (let j: number = i; j < length; j++) {
        if (min > this.arr[j]) {
          min = this.arr[j];
          index = j;
        }
      }
      this.swap(i, index);
    }
  }
}

class SelectionSortLauncher extends SortLauncher {
  constructor() {
    super();
    this.dataStructure = new SelectionSort();
  }

  async execute() {
    await super.launch((answer: { length: string; data: string }) => {
      this.dataStructure.sort(Number(answer.length));
      console.log(this.dataStructure.arr);
    });
  }
}

export { SelectionSortLauncher as AlgorithmLauncher };
