import prisma from "@/infra/database/database.config";
import { ROLE } from "@prisma/client";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserByEmailWithPassword(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        role: true,
        name: true,
        email: true,
        avatar: true,
      },
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
      },
    });
  }

  async createUser(data: {
    email: string;
    name: string;
    password: string;
    role: ROLE;
  }) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
      },
    });
  }

  async updateUserEmailVerification(
    userId: string,
    data: {
      emailVerificationToken: string | null;
      emailVerificationTokenExpiresAt: Date | null;
      emailVerified?: boolean;
    }
  ) {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async updateUserPasswordReset(
    email: string,
    data: {
      resetPasswordToken?: string | null;
      resetPasswordTokenExpiresAt?: Date | null;
      password?: string;
    }
  ) {
    return prisma.user.update({
      where: { email },
      data,
    });
  }

  async findUserByResetToken(hashedToken: string) {
    return prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiresAt: { gt: new Date() },
      },
    });
  }

  async updateUserPassword(userId: string, password: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        password,
        resetPasswordToken: null,
        resetPasswordTokenExpiresAt: null,
      },
    });
  }

  async findUserByPhone(phone: string) {
    // TODO: Add phone field to Prisma schema first
    return null;
    /*
    return prisma.user.findUnique({
      where: { phone },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
      },
    });
    */
  }

  async createUserWithPhone(data: {
    phone: string;
    name: string;
    password?: string;
    role: ROLE;
  }) {
    // TODO: Add phone field to Prisma schema first
    throw new Error("Phone registration not available yet. Please add phone field to User model.");
    /*
    return prisma.user.create({
      data: {
        phone: data.phone,
        name: data.name,
        password: data.password,
        role: data.role,
        email: `${data.phone}@temp.uz`, // Vaqtinchalik email
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
      },
    });
    */
  }
}
