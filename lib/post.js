import path from "path";
import fs from "fs";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts")


export function getPostsData(){
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) =>{
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
          };
    });
    // console.log(allPostsData)
    return allPostsData;
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    // console.log(fileNames)
    return fileNames.map((fileName)=>{
        return {
            params: { 
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

//idに基づいてブログのデータを返す
export async function getPostData(id){
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContent);
    const blogContent = await remark()
    .use(html)
    .process(matterResult.content);
    const blogContentHTML = blogContent.toString();
    // console.log(matterResult.data)
    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    }
}