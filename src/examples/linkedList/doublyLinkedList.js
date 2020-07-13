const path = require("path");
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

function insert(head, tail, data) {
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

function removeFront(head) {
  let node = head.next;
  let next = node.next;

  head.next = node.next;
  next.prev = head;

  node = null;
}

function show(head, tail) {
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

class LinkedListFunction {
  constructor() {
    this.head = new Node();
    this.tail = new Node();

    this.head.next = this.tail;
    this.head.prev = this.head;

    this.tail.next = this.tail;
    this.tail.prev = this.head;
  }

  async insert() {
    inquirer
      .prompt({
        type: "input",
        name: "number",
        message: "Enter number to add at the node.",
      })
      .then(async (answer) => {
        insert(this.head, this.tail, answer.number);

        await this.execute();
      });
  }

  async removeFront() {
    if (this.head.next === this.tail) {
      console.log("No element!");
      return;
    }

    removeFront(this.head);

    await this.execute();
  }

  async show() {
    show(this.head, this.tail);

    await this.execute();
  }

  async execute() {
    return new Promise((resolve) => {
      inquirer
        .prompt({
          type: "rawlist",
          name: "function",
          message: `[DoublyLinkedList] ${message.chooseFunction}`,
          choices: ["insert", "removeFront", "show", message.goBackMessage],
        })
        .then(async (answers) => {
          if (answers.function === message.goBackMessage) {
            this.head.next = null;
            resolve();
            return;
          }

          this[answers.function]();
        });
    });
  }
}

module.exports = LinkedListFunction;
