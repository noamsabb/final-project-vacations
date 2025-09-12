import crypto from "crypto";
import jwt, { SignOptions } from "jsonwebtoken";
import { Role } from "../3-models/role";
import { IUserModel } from "../3-models/user-model";
import { appConfig } from "./app-config";
import { log } from "console";

// Cyber helper class:
class Cyber {
  // SHA: Secure Hashing Algorithm
  // HMAC: Hash-based Message Authentication Code
  public hash(plainText: string): string {
    // Hash without salt:
    // const hashText = crypto.createHash("sha512").update(plainText).digest("hex"); // update --> do it, digest --> return to string format.

    // Hash with salt:
    const hashText = crypto
      .createHmac("sha512", appConfig.hashSaltKey)
      .update(plainText)
      .digest("hex"); // update --> do it, digest --> return to string format.

    return hashText;
  }

  // Creating a JWT token:
  public generateToken(user: IUserModel): string {
    // Remove password:
    (user as any).password = undefined;

  

    // Create options:
    const options: SignOptions = { expiresIn: "3h" }; // 3h = 3 hours, 50m = 50 minutes, 2d = 2 days

    const roleMap = {
      1: "Admin",
      2: "User",
    };

   const safeUser = {
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  roleId: user.roleId,           // Include original roleId
  role: roleMap[user.roleId],    // Include string role for frontend
  likedVacations: user.likedVacations 
};

    // Generate token:
    const token = jwt.sign({ user : safeUser}, appConfig.jwtSecretKey, options);
    
    // Return token:
    return token;
  }

  // Verify token:
  public verifyToken(token: string): boolean {
    try {
      // If no token:
      if (!token) return false;

      // Verify token validity, not expired etc:
      jwt.verify(token, appConfig.jwtSecretKey);

      // Token is valid:
      return true;
    } catch (err: any) {
      return false; // Token is not valid.
    }
  }

  // Verify admin:
  public verifyAdmin(token: string): boolean {
    try {
      // If no token:
      if (!token) return false;

      // Verify token validity, not expired etc:
      jwt.verify(token, appConfig.jwtSecretKey);

      // Extract container from token:
      const container = jwt.decode(token) as { user: any };

      // Extract user from container:
      const user = container.user;

      console.log(user);
      
      // Return true if user is admin:
      return user.roleId === Role.Admin;
    } catch (err: any) {
      return false; // Token is not valid.
    }
  }
}

export const cyber = new Cyber();
