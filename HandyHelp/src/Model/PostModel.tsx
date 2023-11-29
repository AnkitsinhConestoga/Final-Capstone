import { Geohash } from "geofire-common";

interface PostModel {
    postTitle: string;
    postPrice: number;
    postDesc: string;
    postLat: number;
    postLong: number;
    postStreet: string;
    postPostal: string;
    postCity:string;
    authorId: string;
    postId: string;
    isForVerified:boolean;
    workDuration:number;
    workDistance:number;
    createdDate: string;
    scheduleData:string;
    postStatus:string;
    workerId:string;
    geohash:Geohash;
    postImages: string[];
  }
  
  export default PostModel;