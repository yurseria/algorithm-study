import inquirer from "inquirer";
import message from "../../config/message.json";
import { AlgorithmLauncher } from "../../utils/algorithmLauncher";

class NodeQueue {}

class NodeQueueLauncher extends AlgorithmLauncher {
  constructor() {
    super();
    this.dataStructure = new NodeQueue();
  }
}

export { NodeQueueLauncher as AlgorithmLauncher };
