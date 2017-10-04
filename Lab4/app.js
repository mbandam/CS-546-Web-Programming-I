const connection = require("./mongoConnection");
const todo = require("./todo");
async function main() {
  try{
    const createdTask1 = await todo.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
    console.log("task 1 created");
    console.log(createdTask1);

    const createdTask2 = await todo.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
    console.log("task 2 created");
    console.log(createdTask2);
  
    // querrying all the tasks and displaying them
    console.log("Printing All Tasks....");
    const getTasks = await todo.getAllTasks();
    console.log(getTasks);

    // Removing first task
    console.log("removing task 1");
    console.log("The Id for that task is: " +getTasks[0]._id);
    const deleteIt = await todo.removeTask(getTasks[0]._id);
    
    //Querry remaining task and print
    console.log("Printing the remaining tasks");
    const getTasks1 = await todo.getAllTasks();
    console.log(getTasks1);

    console.log("Complete the remaining task")
    const completedTask = await todo.getAllTasks(getTasks1);   
    for(i=0;i<completedTask.length;i++) {
      finishedTask = await todo.completeTask(getTasks1[i]._id); 
      console.log(finishedTask);
    }
    
    try {
      return await todo.getTask(completedTask);  // change id accordingly
        } catch (error) {
          console.error(error);
       }
    }catch(e){
        console.log(e);
    }
    console.log("Done!");
    const db = await connection();
    await db.close();       
}
try{
main();
}catch(e){
    console.log(e)
}
