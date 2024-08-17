import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTdoDto, UpdateTodoDto } from "../../domain/dtos";

const todos = [
    {id: 1, text: 'Buy milk', completeAt: new Date() },
    {id: 2, text: 'Buy bread', completeAt: null },
    {id: 3, text: 'Buy butter', completeAt: new Date() },
];

export class TodosController {

    //* DI
    /* 
        Este ejemplo no esta usando Clean Architecture
    */
    constructor() {}

    public getTodos = async (req: Request, res:Response) => {

        const todos = await prisma.todo.findMany();

        //return res.json(todos)
        res.json(todos)
    }

    public getTodosById = async (req: Request, res:Response) => {
        const id = +req.params.id;

        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});

        //const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        });

        (todo)
            ? res.json(todo)
            : res.status(404).json({error: `TODO with id ${id} not found`});
    }

    public createTodo = async ( req: Request, res: Response) => {
        //const { text } = req.body;
        const [error, createTodo] = CreateTdoDto.create(req.body);

        if(error) return res.status(400).json({error});
        //if(!text) return res.status(400).json({ error: 'Text porperty is required'});

        const todo = await prisma.todo.create({
            data: createTodo!
        });

        /* const newTodo = {
            id: todos.length + 1,
            text,
            completeAt: null
        }; */

        //todos.push(newTodo); //para graba en la DB

        res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        //if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
        const [error, updateTodoDto] = UpdateTodoDto.update({...req.body, id});

        if(error) return res.status(400).json(error);
        
        //const todo = todos.find(todo => todo.id === id);
        const todoDB = await prisma.todo.findUnique({where: { id: id}});
        if(!todoDB) return res.status(404).json({error: `Todo with id ${id} not found`});

        //const {text, completeAt} = req.body;

        //todoDB.text = text;
        //! OJO, pasando por referencia(No se deberia de hacer. Esto muta la informacion del objeto)
        /* (completeAt === 'null')
            ? todoDB.completeAt = null
            : todoDB.completeAt = new Date(completeAt || todoDB.completeAt); */

        const todoUpdate = await prisma.todo.update({
            where: { id: id},
            data: updateTodoDto!.values,
        });

        res.json(todoUpdate);
        
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
        
        //const todo = todos.find(todo => todo.id === id);
        const todoDB = await prisma.todo.findUnique({where: { id: id}});
        if(!todoDB) return res.status(404).json({error: `Todo with id ${id} not found`});

        //todos.splice(todos.indexOf(todo), 1);
        const todoDelete = await prisma.todo.delete({
            where: {id: id}
        });

        (todoDelete)
            ? res.json(todoDelete)
            : res.status(400).json({ error: `Todo with id ${id} not found`})
        
    }
}