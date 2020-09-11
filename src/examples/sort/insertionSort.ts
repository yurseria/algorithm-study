import { SelectionSort, AlgorithmLauncher } from "./selectionSort";

class InsertionSort extends SelectionSort {
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

class InsertionSortLauncher extends AlgorithmLauncher {
  constructor() {
    super();
    this.dataStructure = new InsertionSort();
  }
}

export { InsertionSortLauncher as AlgorithmLauncher };
