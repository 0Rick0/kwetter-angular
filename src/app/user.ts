export class User {
  id: number;
  username: string;
  fullname: string;
  location: string;
  website: string;
  biography: string;
  profilePicture: string;
  following: string[]; // usernames
  followedBy: string[]; // usernames
  groups: string[];
  kwets: number[];//ids
  likes: number[];//ids
}
