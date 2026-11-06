import express from 'express'
import prisma from '../prismaClient.js';

const router = express.Router();
//get all the todos
router.get('/', async(req, res)=>{
    try{
    const todos = await prisma.todo.findMany({
        where:{
            userId: req.userId
        }
    })
    res.json(todos);
    }catch(err){
        console.log("Error fetching todos");
        res.status(501).json({message: "Error fetching"})
    }
})
//add a todo
router.post('/',async (req,res)=>{
    const {task} = req.body;
    const todo = await prisma.todo.create({
        data:{
            task: task,
            userId: req.userId
        }
    })
    res.json(todo);

});

router.put('/:id', async (req, res)=>{
    const {completed} = req.body;
    const {id} = req.params; //send the network reuqests using params or query as well and deconstrocut a query using req.query req means the endpoint url requested by the user
    const updatedTodo = await prisma.todo.update({
        where:{
            id: parseInt(id),
            userId: req.userId
        },
        data:{
            completed: !!completed
        }
    })

    res.json(updatedTodo);

})

router.delete('/:id', async (req, res)=>{
    const {id} = req.params;
    const userId = req.userId;
    await prisma.todo.delete({
        where:{
            id: parseInt(id),
            userId: userId
        }
    })
    res.send({message: "Todo Deleted"});
})

export default router;