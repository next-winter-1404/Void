'use client'
import {useState,useEffect} from "react"
import Image from "next/image"
import Avatar from "@/assets/ico/avatar.png";
import ArrowUpLeft from "@/assets/ico/detailPage/arrow-move-up-left.png"
import CommentForm from "./commentForm";

import PaginationPage from "@/components/common/paginationPage/paginationPage";


interface commentReply {
     id:number,
     house_id:number,
     title:string,
     caption:string,
     created_at:string,
     parent_comment_id?:number | null;
      user:{
        firstName:string,
        lastName:string,
        profilePicture?:string | null,
      }

}

interface comments {
        id:number,
        house_id:number,
        title:string,
        caption:string,
        rating:string,
        created_at:string,
        parent_comment_id:number,
        user:{
          firstName:string,
          lastName:string,
          profilePicture?:string | null,
        }
        parent_comment:commentReply
}

 interface  commentsProps {
   comments:comments[]
}



export default function commentBox({comments}:commentsProps){

 // reply Toggle
const [showReplies, setShowReplies] = useState<Record<number, boolean>>({});
const [showReplyForm, setShowReplyForm] = useState<Record<number, boolean>>({});
 

const toggleReplyForm = (commentId: number) => {
  setShowReplyForm(prev => ({
    ...prev,
    [commentId]: !prev[commentId]
  }));
};

const toggleReplies = (commentId: number) => {
  setShowReplies(prev => ({
    ...prev,
    [commentId]: !prev[commentId]
  }));
};

  const [currentItems,setCurrentItems] = useState<any[]>([]);



    return(
        <>
         <div className="w-full flex flex-col gap-2 p-1 mt-5">


             <CommentForm/>
           

            <div className=" w-full flex flex-col gap-5 mt-5">

               {currentItems.map((comment:comments)=>(

                  <div key={comment.id} className="flex flex-col w-full">
                   <div className=" w-full
                    flex flex-row gap-2  ">

                        <div className="h-full">
                        <Image alt="avatar" src={Avatar} className="rounded-full w-10 h-10"/>
                        </div>

                        <div className="  text-[12px]  flex flex-wrap">
                           <span className="w-full font-medium h-[50%]">
                            {`${comment.user.firstName +" "+comment.user.lastName}`}
                            </span> 
                           <span className="w-full h-[50%]">{comment.created_at}</span> 
                        </div>
                    </div>

                    <p  className="w-full  tex-[13px] p-1 pr-10">
                       {comment.title}<br/>
                       {comment.caption}
                   </p>

                    <div className="flex flex-row w-[300px] mr-10 gap-3 text-[13px] font-medium ">
                       <button className="text-[blue]/80">جواب دادن</button>

                       <button
                         onClick={() => toggleReplies(comment.id)}
                        className="text-[gray]/90"
                        >مشاهده پاسخ ها 
                        </button>
                    </div> 

                    {showReplies[comment.id] && comment.parent_comment_id && 
                        
                      <div key={comment.parent_comment_id} className="flex flex-col w-full mr-7 mt-2">     
                       
                        <div className=" w-full
                         flex flex-row gap-2  ">
                           <span className=" h-full flex flex-col items-center justify-center">
                           <Image alt="arrow" className="ml-2" src={ArrowUpLeft}  />
                         </span>
     
                             <div className="h-full">
                             <Image alt="avatar" src={Avatar} className="rounded-full w-10 h-10"/>
                             </div>
     
                             <div className="  text-[12px]  flex flex-wrap">
                                <span className="w-full font-medium h-[50%]">
                                 {`${comment.parent_comment.user.firstName +" "+comment.parent_comment.user.lastName}`}
                                 </span> 
                                <span className="w-full h-[50%]">{comment.parent_comment.created_at}</span> 
                             </div>
                         </div>
     
                         <p  className="w-full  tex-[13px] p-1 pr-10">
                            {comment.parent_comment.title}<br/>
                            {comment.parent_comment.caption}
                        </p>
     
                         <div className="flex flex-row w-[300px] mr-10 gap-3 text-[13px] font-medium ">
                            <button className="text-[blue]/80">جواب دادن</button>
                            <button className="text-[gray]/90">مشاهده پاسخ ها 12</button>
                         </div> 
                         </div>
                      }
                   
                </div>

               ))}
               

              <PaginationPage productInArray={comments} itemsPerPage={5} setCurrentItems={setCurrentItems} />
            </div>

         </div>

        </>
    )
}