interface PostModel {
    postTitle: string;
    postPrice: number;
    postDesc: string;
    postLat: number;
    postLong: number;
    postStreet: string;
    postPostal: string;
    authorId: string;
    postId: string;
    isForVerified:boolean;
    createdDate: Date;
    postImages: string[];
  }
  
  export default PostModel;