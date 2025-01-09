import { Controller, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor (private readonly taskService: TaskService){}

    @Post('create')
    async createTask(){
        return await this.taskService.createTask();
    }

}
