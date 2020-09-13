import { Sort, SortLauncher } from "../../utils/sortLauncher";

class RadixSort extends Sort {
  readonly MAX_VALUE: number;
  resultArr: number[];

  constructor() {
    super();
    this.MAX_VALUE = 10000;
    this.resultArr = new Array(this.MAX_VALUE).fill(0);
  }

  radixSort(n: number): void {
    let maxValue = 0;
    let exp = 1;
    let digit = 10;

    for (let i = 0; i < n; i++) {
      if (this.arr[i] > maxValue) maxValue = this.arr[i];
    }

    while (maxValue / exp > 1) {
      let digitArr = new Array(digit).fill(0);

      // Step 1 : Allocate original array by digit.
      for (let i = 0; i < n; i++) {
        const digitIndex = (this.arr[i] / exp) % 10;
        digitArr[Math.floor(digitIndex)]++;
      }

      // Step 2 : Create stacked array.
      for (let i = 1; i < digit; i++) {
        digitArr[i] += digitArr[i - 1];
      }

      // Step 3 : In the digit array, the value corresponding to the original digit is put into the result array.
      for (let i = n - 1; i >= 0; i--) {
        const digitIndex = (this.arr[i] / exp) % 10;
        let digitArrIndex = --digitArr[Math.floor(digitIndex)];
        this.resultArr[--digitArrIndex] = this.arr[i];
      }

      // Step 4 : After sorting, transfer the values of the result array to the original.
      for (let i = 0; i < n; i++) {
        this.arr[i] = this.resultArr[i];
      }

      exp *= 10;
    }
  }
}

class RadixSortLauncher extends SortLauncher {
  dataStructure: RadixSort;

  constructor() {
    super();
    this.dataStructure = new RadixSort();
  }

  async execute() {
    await super.launch((answer: { length: string; data: string }) => {
      this.dataStructure.radixSort(Number(answer.length));
      console.log(this.dataStructure.arr);
    });
  }
}

export { RadixSortLauncher as AlgorithmLauncher };
