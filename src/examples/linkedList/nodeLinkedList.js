class Node {
  constructor() {
    this.data = null;
    this.next = null;
  }

  addBack() {
    const node = new Node();

    if (head == null) {
      head = node;
    } else {
    }
  }

  addFirst() {}

  show() {}
}

class LinkedListFunction {
  addBack() {}

  addFirst() {}

  show() {}

  execute() {}
}

const head = new Node();
const node1 = new Node();
const node2 = new Node();

node1.data = 1;
node2.data = 2;

head.next = node1;
node1.next = node2;
node2.next = null;

let cur = head.next;
while (cur !== null) {
  console.log(cur.data);
  cur = cur.next;
}
