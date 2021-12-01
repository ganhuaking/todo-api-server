import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepository } from './users.repository';
const mockUsersRepository = () => ({
  createUser: jest.fn(),
  findOne: jest.fn(),
});
const mockJwtService = () => ({
  sign: jest.fn(),
});
describe('AuthService', () => {
  let authService: AuthService;
  let usersRepository;
  let jwtService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersRepository, useFactory: mockUsersRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    jwtService = module.get<JwtService>(JwtService);
  });
  describe('signUp', () => {
    const mockAuthCredentialDto = {
      username: 'mockUser',
      password: 'mockPasswd',
    };
    it('calls UsersRepository.createUser once', async () => {
      await authService.signUp(mockAuthCredentialDto);
      expect(usersRepository.createUser).toHaveBeenCalled();
    });
  });
  describe('signIn', () => {
    const mockUser = {
      username: 'user1',
      password: '1QaZ@wSx',
    };
    it('calls UsersRepository.findOne and return accessToken', async () => {
      const mockResolvedUser = {
        username: 'user1',
        password:
          '$2b$10$VVSX4TK6LJLyMQP8SSHk5OVH6fJ4Ot63NZa4jNDcmBbSo70OMRTCq',
      };
      const mockSignResult = {
        accessToken: 'signResult',
      };
      usersRepository.findOne.mockResolvedValue(mockResolvedUser);
      jwtService.sign.mockResolvedValue(mockSignResult.accessToken);
      const result = await authService.signIn(mockUser);
      expect(result).toEqual(mockSignResult);
    });
    it('calls UsersRepository.findOne and handle an error which not found user', async () => {
      usersRepository.findOne.mockResolvedValue(null);
      try {
        await expect(authService.signIn(mockUser)).rejects.toThrow(
          UnauthorizedException,
        );
      } catch (error) {
        throw error;
      }
    });
    it('calls UsersRepository.findOne and handle an error which password not macth', async () => {
      const mockResolvedUser = {
        username: 'user1',
        password:
          '$2b$10$VVSX4TK6LJLyMQP8SSHk5OVH6fJ4Ot63NZa4jNDcmBbSo70OMRTCq1',
      };
      usersRepository.findOne.mockResolvedValue(mockResolvedUser);
      try {
        await expect(authService.signIn(mockUser)).rejects.toThrow(
          UnauthorizedException,
        );
      } catch (error) {
        throw error;
      }
    });
  });
});
