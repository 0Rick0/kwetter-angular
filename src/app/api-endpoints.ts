const basepath = "http://localhost:8080/";
export class ApiEndpoints {
  static feedUser: string = basepath + "kwets/offollowed/%(username)s";
  static userPicture: string = basepath + "users/%(username)s/profilepicture";
  static userInfo: string = basepath + "users/%(username)s";
  static userAuthInfo: string = basepath + "users/%(username)s/auth";
  static postKwet: string = basepath + "kwets/new/%(username)s";
  static trendingTags: string = basepath + "kwets/trends";
  static kwetsByTag: string = basepath + "kwets/oftag/%(tag)s";
  static kwetById: string = basepath + "kwets/byid/%(kwetid)s";
  static likeKwet: string = basepath + "kwets/like/%(kwetid)d";
  static kwetsOfUser: string = basepath + "kwets/ofuser/%(username)s";
  static search: string = basepath + "kwets/search?query=%(query)s";
  static userws: string = "ws://%(username)s:%(password)s@localhost:8080/fontys_kwetter_war_exploded/ws/feed/%(username)s";

}
