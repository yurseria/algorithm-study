import { Sort, SortLauncher } from "../../utils/sortLauncher";

class CountingSort extends Sort {
  readonly MAX_VALUE: number;
  resultArr: number[];

  constructor() {
    super();
    this.MAX_VALUE = 10000;
    this.resultArr = new Array(this.MAX_VALUE).fill(0);
  }

  setResultArr(length: number): void {
    for (let i: number = 0; i < length; i++) {
      this.resultArr[this.arr[i]]++;
    }
  }

  sort(length: number): void {
    for (let i: number = 0; i < this.MAX_VALUE; i++) {
      while (this.resultArr[i] !== 0) {
        process.stdout.write(`${i} `);
        this.resultArr[i]--;
      }
    }
  }
}

class CountingSortLauncher extends SortLauncher {
  dataStructure: CountingSort;

  constructor() {
    super();
    this.dataStructure = new CountingSort();
  }

  async execute() {
    await super.launch((answer: { length: string; data: string }) => {
      this.dataStructure.setResultArr(Number(answer.length));
      this.dataStructure.sort(Number(answer.length));
      console.log();
    });
  }
}

export { CountingSortLauncher as AlgorithmLauncher };
