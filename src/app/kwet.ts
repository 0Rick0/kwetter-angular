import {User} from "./user";
export class Kwet {
  public id: number;
  public text: string;
  public tags: string[];
  public mentions: User[];
  public kwet_by: User[];
  public liked_by: User[];
  public created_at: number;//timestamp
}
