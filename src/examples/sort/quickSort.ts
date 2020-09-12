import { Sort, SortLauncher } from "../../utils/sortLauncher";

class QuickSort extends Sort {
  constructor() {
    super();
  }

  quickSort(start: number, end: number): void {
    if (start >= end) return;

    const key: number = start;
    let i: number = start + 1;
    let j: number = end;

    while (i <= j) {
      while (i <= end && this.arr[i] <= this.arr[key]) i++;
      while (j > start && this.arr[j] >= this.arr[key]) j--;
      if (i > j) this.swap(key, j);
      else this.swap(i, j);
    }

    this.quickSort(start, j - 1);
    this.quickSort(j + 1, end);
  }
}

class QuickSortLauncher extends SortLauncher {
  dataStructure: QuickSort;

  constructor() {
    super();
    this.dataStructure = new QuickSort();
  }

  async execute() {
    await super.launch((answer: { length: string; data: string }) => {
      this.dataStructure.quickSort(0, Number(answer.length) - 1);
      console.log(this.dataStructure.arr);
    });
  }
}

export { QuickSortLauncher as AlgorithmLauncher };
