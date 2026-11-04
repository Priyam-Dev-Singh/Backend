import express from 'express'
import db from '../db.js';

const router = express.Router();

router.get('/',(req, res)=>{
    try{
        const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
    const todos = getTodos.all(req.userId);
    res.json(todos);
    }catch(err){
        console.log("Error fetching todos");
        res.status(501).json({message: "Error fetching"})
    }
})

router.post('/',(req,res)=>{
    const {task} = req.body;
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?,?)`)
    const result = insertTodo.run(req.userId, task)
    console.log("insert todo: ", insertTodo);
    res.json({id: result.lastInsertRowid, task: task, completed: 0})

});

router.put('/:id', (req, res)=>{
    const {completed} = req.body;
    const {id} = req.params; //send the network reuqests using params or query as well and deconstrocut a query using req.query req means the endpoint url requested by the user
    const {page} = req.query;
    const updatedTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ?')
    updatedTodo.run(completed, id)

    res.json({message: 'Todo Completed'});

})

router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    const userId = req.userId;
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id=? AND user_id = ?`);
    deleteTodo.run(id, userId);
    res.send({message: "Todo Deleted"});
})

export default router;