import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
});
const mockUser = {
  username: 'json',
  id: 'myid',
  password: 'mypasswd',
  tasks: [],
};
describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    // initialize a NestJs module
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });
  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      // call tasksService.getTasks, which should then call the repository.getTasks
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });
  describe('getTasksById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test desc',
        id: 'testid',
        status: TaskStatus.OPEN,
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById({ id: 'testid' }, mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      try {
        await expect(
          tasksService.getTaskById({ id: 'someId' }, mockUser),
        ).rejects.toThrow(NotFoundException);
      } catch (error) {
        throw error;
      }
    });
  });
  describe('createTask', () => {
    it('calls TasksRepository.createTask and return the result', async () => {
      const mockCreateDto = {
        title: 'test title',
        description: 'test description',
      };
      const mockTask = {
        title: 'test title',
        description: 'test description',
        status: TaskStatus.OPEN,
        id: 'test id',
      };
      tasksRepository.createTask.mockResolvedValue(mockTask);
      const result = await tasksService.createTask(mockCreateDto, mockUser);
      expect(result).toEqual(mockTask);
    });
  });
  describe('deleteTaskId', () => {
    const mockDeleteDto = {
      id: 'testid',
    };
    it('calls TasksRespository.delete once', async () => {
      tasksRepository.delete.mockResolvedValue({ affected: 1 });
      await tasksService.deleteTaskById(mockDeleteDto, mockUser);
      expect(tasksRepository.delete).toHaveBeenCalled();
    });
    it('calls TasksRespository.delete and handle an error', async () => {
      tasksRepository.delete.mockResolvedValue({ affected: 0 });
      try {
        await expect(
          tasksService.deleteTaskById(mockDeleteDto, mockUser),
        ).rejects.toThrow(NotFoundException);
      } catch (error) {
        throw error;
      }
    });
  });
  describe('updateTaskById', () => {
    const mockUpdateDto = {
      status: TaskStatus.IN_PROGRESS,
      id: 'testid',
    };
    it('calls TasksRepository.save and returns the result', async () => {
      const mockRespTask = {
        title: 'Test title',
        description: 'Test desc',
        id: 'testid',
        status: TaskStatus.IN_PROGRESS,
      };
      const mockFindTask = {
        title: 'Test title',
        description: 'Test desc',
        id: 'testid',
        status: TaskStatus.OPEN,
      };
      tasksRepository.findOne.mockResolvedValue(mockFindTask);
      tasksRepository.save.mockResolvedValue(mockRespTask);
      const result = await tasksService.updateTaskStatusById(
        mockUpdateDto,
        mockUser,
      );
      expect(result).toEqual(mockRespTask);
    });
    it('calls TasksRepository.save and handle an error', async () => {
      tasksRepository.save.mockResolvedValue(null);
      try {
        await expect(
          tasksService.updateTaskStatusById(mockUpdateDto, mockUser),
        ).rejects.toThrow(NotFoundException);
      } catch (error) {
        throw error;
      }
    });
  });
});
