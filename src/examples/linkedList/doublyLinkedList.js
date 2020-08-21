const inquirer = require("inquirer");
const message = require("../../config/message");

// Ascending-ordered number Linked list

class Node {
  constructor() {
    this.data = null;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  insert(head, tail, data) {
    const node = new Node();
    let cur = new Node();
    let prev = new Node();

    node.data = data;
    cur = head.next;

    while (Number(cur.data) < Number(data) && cur !== tail) {
      cur = cur.next;
    }

    prev = cur.prev;
    prev.next = node;
    node.prev = prev;
    cur.prev = node;
    node.next = cur;
  }

  removeFront(head) {
    let node = head.next;
    let next = node.next;

    head.next = node.next;
    next.prev = head;

    node = null;
  }

  show(head, tail) {
    let cur = new Node();
    cur = head.next;

    process.stdout.write("head");

    while (cur !== tail) {
      process.stdout.write(" <-> ");
      process.stdout.write(`${cur.data}`);
      cur = cur.next;
    }

    process.stdout.write(" <-> tail\n");
  }
}

class LinkedListFunction {
  constructor() {
    this.head = new Node();
    this.tail = new Node();

    this.head.next = this.tail;
    this.head.prev = this.head;

    this.tail.next = this.tail;
    this.tail.prev = this.head;

    this.linkedList = new DoublyLinkedList();
  }

  async insert() {
    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt({
        type: "input",
        name: "number",
        message: "Enter number to add at the list.",
      });

      this.linkedList.insert(this.head, this.tail, answer.number);
      resolve();
    });
  }

  removeFront() {
    if (this.head.next === this.tail) {
      return new Error("No element!");
    }

    this.linkedList.removeFront(this.head);
  }

  show() {
    this.linkedList.show(this.head, this.tail);
  }

  async execute() {
    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt({
        type: "rawlist",
        name: "function",
        message: `[DoublyLinkedList] ${message.chooseFunction}`,
        choices: ["insert", "removeFront", "show", message.goBackMessage],
      });

      if (answer.function === message.goBackMessage) {
        this.head.next = null;
        resolve();
        return;
      }

      await this[answer.function]();
      await this.execute();
      resolve();
    });
  }
}

module.exports = LinkedListFunction;
