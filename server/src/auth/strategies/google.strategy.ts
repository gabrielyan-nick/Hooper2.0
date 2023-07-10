import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from 'src/auth/auth.service';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy) {
//   constructor(private auth: AuthService) {
//     super({
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//       callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
//       scope: ['email', 'profile'],
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ): Promise<any> {
//     const user = await this.auth.googleLogin(profile);

//     done(null, user);
//   }
// }
