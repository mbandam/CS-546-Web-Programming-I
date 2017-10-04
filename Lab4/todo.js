const mongoCollections = require("./mongoCollections");
const todoItems = mongoCollections.todoItems;
let uuid = require("uuid");

module.exports = {
  // Creating the Task
  async createTask(title, description) {
    if(!title) {
       throw "you must need to provide a title!";
    }
    else if(!description) {
       throw "you must need to provide a description!";
    }
    else {
        let myCollections = await todoItems();
        let id = uuid.v1();
        let newTasks={
               _id : id,
               title: title,
               description: description,
               "completed" : "false",
               "completedAt" : null
           };
       const insertNew = await myCollections.insertOne(newTasks);
       if (insertNew.insertedCount === 0) throw "Not able to add task";

       const newId = insertNew.insertedId;
       const tasks = await this.getTask(newId);
       return tasks;
    }    
  },
  
    // getting the task
    async getTask(id) {
        if (!id) 
            throw "You must give an id to search for";
        
        const myTask = await todoItems();
        const task = await myTask.findOne({ _id: id });

        if (task === null) 
            throw "No task with that id";
   
        return task; 
    },

    async getAllTasks() {
        const allTasks = await todoItems();
        const tasks = await allTasks.find({}).toArray();
        return tasks;
    },

    async  completeTask(id) {
      if(!id)
      {
          throw "you must need to provide an id";
      }

      let dateTime= new Date();
      let currentDateTime = dateTime.getHours()+":"+dateTime.getMinutes()+":"+dateTime.getSeconds();
      let completedTask = await todoItems();
      const updateInfo = await completedTask.updateOne({ _id: id }, {$set:{'completed' : true,'completedAt' :currentDateTime}});
      if (updateInfo.modifiedCount === 0) {
        throw "could not update todo successfully";
        }
      return await this.getTask(id);  
  },

    async removeTask(id) {
        if (!id) throw "You must give an id to search for";
        const myTask = await todoItems();
        const deleteInfo = await myTask.removeOne({ _id: id });
        if((deleteInfo.deleteCount)===0) {
          throw `Could not delete task with id of ${id}`;
          }   
    }
};
