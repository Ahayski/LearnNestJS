import { Injectable } from '@nestjs/common';
import { CreateTaskDto} from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { task } from './data/task';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {

    constructor(private readonly prisma: PrismaService){}

    async createTask(data: CreateTaskDto){
        const createData= await this.prisma.task.create({
            data: data,
        })
        
        return {
            statusCode: 200,
            message: "Task successfully created",
            data: createData
        }
    }

    async getAllTask(){
        return {
            message: "Get All Tasks successfully",
            data: task
        }
    }

    async getTaskById(task_id: number){
        const taskId = task.find((task) => task.task_id == task_id)
        return {
            message: "successfully get task by id",
            data: taskId
        }
    }

    // async updateTaskById(task_id: number, data: UpdateTaskDto){
    //     const taskId = task.find((task) => task.task_id == task_id)
    //     return {
    //         message: "successfully update task by id",
    //         data: taskId
    //     }
    // }

    async updateTaskById(task_id: number, data: UpdateTaskDto){
        const taskId = task.findIndex((task) => task.task_id == task_id);
        if (taskId !== -1) {
            task[taskId] = { ...task[taskId], ...data };
            return {
                message: "successfully update task by id",
                data: task[taskId]
            }
        } else {
            return {
                message: "Task not found",
                data: null
            }
        }
    }

    async deleteById(task_id: number){
        const taskId = task.findIndex((task) => task.task_id == task_id);

        if(taskId !== -1){
            const deletedTask = task.splice(taskId, 1);

            return {
                message: "Task successfully deleted",
                data: deletedTask[0], // Mengembalikan elemen yang dihapus
            };
        }else {
            return{
                message : "Task not Found",
                data : null
            }
        }
        
    }
}
