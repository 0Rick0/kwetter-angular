const basepath = "http://localhost:8080/fontys_kwetter_war_exploded/api/";
export class ApiEndpoints {
  static feedUser: string = basepath + "kwets/byuser/%(username)s";
  static userPicture: string = basepath + "user/%(username)s/profilepicture";
  static userInfo: string = basepath + "user/%(username)s";
  static postKwet: string = basepath + "kwets/";
  static trendingTags: string = basepath + "kwets/trends";
  static kwetsByTag: string = basepath + "kwets/bytag/%(tag)s";
  static kwetById: string = basepath + "kwets/byid/%(kwetid)s";
  static likeKwet: string = basepath + "kwets/like/%(kwetid)d";
  static kwetsOfUser: string = basepath + "kwets/byuser/%(username)s";

}
