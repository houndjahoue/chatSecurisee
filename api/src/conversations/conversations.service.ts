import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { USER_SELECT_FIELDS } from 'src/users/users.service';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async registerNewUser(userId: string) {
    const users = await this.prisma.user.findMany();
    const userConversations = users.map((u) => ({
      senderId: userId,
      receiverId: u.id,
    }));
    return await this.prisma.conversation.createMany({
      data: userConversations,
    });
  }

  async findAllByUserId(userId: string, search?: string) {
    return await this.prisma.conversation.findMany({
      where: search
        ? {
            AND: [
              { OR: [{ senderId: userId }, { receiverId: userId }] },
              {
                OR: [
                  {
                    sender: {
                      username: { contains: search },
                    },
                  },
                  {
                    receiver: {
                      username: { contains: search },
                    },
                  },
                ],
              },
            ],
          }
        : { OR: [{ senderId: userId }, { receiverId: userId }] },
      include: {
        sender: { select: USER_SELECT_FIELDS },
        receiver: { select: USER_SELECT_FIELDS },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
        sender: true,
        receiver: true,
      },
    });
  }
}
