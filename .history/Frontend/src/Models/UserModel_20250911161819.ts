export class UserModel{
public _id?: string;
public firstName?: string;
public lastName?: string;
public email?: string;
public password?: string;
public roleId?: number;  // 1=Admin, 2=User
public likedVacations?: string[];

// Helper method to get role display name
public getRoleDisplayName(): string {
  switch (this.roleId) {
    case 1: return "Admin";
    case 2: return "User";
    default: return "User";
  }
}

// Helper method to check if user is admin
public isAdmin(): boolean {
  return this.roleId === 1;
}
}
