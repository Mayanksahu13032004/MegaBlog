import conf from '../conf/conf.js'
import { Client, ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    buket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }


    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(

                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("appwrite create post me error",error);
        }
    }

async updatePost(slug,{title,content,featuredImage,status}){
try {
    return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
            title,
            content,
            featuredImage,
            status,
        }
    )
} catch (error) {
    console.log("appwrite service in  updateed post",error);
}

}


async deletePost(slug){
try {
    await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug

    )
    return true
} catch (error) {
 console.log("appwrite service in delete post ",error);   
 return false
}
}



async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("appwrite service :: getpost : error ",error);
        return false
    }
}

async getPosts(queires=[Query.equal("status","active")]){
try {
    return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queires,
        
    )
} catch (error) {
    console.log("appwrite getposts error",error);
    return false
}
}



// file upload service

async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("appwrite erroe in uploaded file",error);
        return false
    }
}



// delete file

async deleteFile(fileid){
try {
     await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileid
     )
     return true
} catch (error) {
    console.log("appwrite erroe  in delete file",error);
    return false
}
}



 getfilePreview(fileid){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileid
    )
}

}




const service=new Service()
export default service