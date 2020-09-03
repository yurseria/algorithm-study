import inquirer from "inquirer";
import message from "../../config/message.json";
import DataStructure from "../../interfaces/IdataStructure";

// Ascending-ordered number Linked list

class Node {
  data: string;
  prev: Node | null;
  next: Node | null;

  constructor() {
    this.data = "";
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  head: Node;
  tail: Node;

  constructor() {
    this.head = new Node();
    this.tail = new Node();

    this.head.next = this.tail;
    this.head.prev = this.head;

    this.tail.next = this.tail;
    this.tail.prev = this.head;
  }

  insert(data: string) {
    const node = new Node();
    let cur = new Node();
    let prev = new Node();

    node.data = data;
    cur = this.head.next as Node;

    while (Number(cur.data) < Number(data) && cur !== this.tail) {
      cur = cur.next as Node;
    }

    prev = cur.prev as Node;
    prev.next = node;
    node.prev = prev;
    cur.prev = node;
    node.next = cur;
  }

  removeFront() {
    let node = this.head.next as Node;
    let next = node.next as Node;

    this.head.next = node.next;
    next.prev = this.head;
  }

  show() {
    let cur = this.head.next as Node;

    process.stdout.write("head");

    while (cur !== this.tail) {
      process.stdout.write(" <-> ");
      process.stdout.write(`${cur.data}`);
      cur = cur.next as Node;
    }

    process.stdout.write(" <-> tail\n");
  }
}

class LinkedListFunction extends DataStructure {
  constructor() {
    super();
    this.dataStructure = new DoublyLinkedList();
  }

  async insert() {
    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt({
        type: "input",
        name: "number",
        message: "Enter number to add at the list.",
      });

      this.dataStructure.insert(answer.number);
      resolve();
    });
  }

  removeFront() {
    if (this.dataStructure.head.next === this.dataStructure.tail) {
      return new Error("No element!");
    }

    this.dataStructure.removeFront();
  }

  show() {
    this.dataStructure.show();
  }
}

module.exports = LinkedListFunction;
