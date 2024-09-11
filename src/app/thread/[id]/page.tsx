"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import router from 'next/router'
import Navbar from "../../components/Navbar"
import '../../globals.css'
import '../../../../public/gear-solid.svg'

type Comment = {
  content: string;
  creator: string;
  replies: Reply[];
  isAnswer: boolean; // New property to indicate if the comment is marked as an answer
};

type Reply = {
  content: string;
  creator: string;
};

type Data = {
  id: string;
  category: string;
  creator: string;
  title: string;
  description: string;
  creationDate: string;
  comments: Comment[];
  locked: boolean;
};

function Thread() {
  const [data, setData] = useState<Data>({
    id: "",
    category: "",
    title: "",
    description: "",
    creationDate: "",
    creator: "",
    comments: [],
    locked: false,
  });

  const [threadId, setThreadId] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const [newReply, setNewReply] = useState<{ [key: number]: string }>({});
  const key = "forum/threads";
  const categories = ['Thread', 'QNA', 'General'];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(true);
  const inappropriateWords = ['poop', 'ugly', 'shit']; // Add your list of inappropriate words here


  const toggleModeratorButtons = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const containsInappropriateLanguage = (text: string) => {
    return inappropriateWords.some(word => text.toLowerCase().includes(word));
  };
  
  const censorText = (text: string) => {
    let censoredText = text;
    inappropriateWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      censoredText = censoredText.replace(regex, '*'.repeat(word.length));
    });
    return censoredText;
  };

  useEffect(() => {
    const getIdFromUrl = () => {
      const urlParts = window.location.pathname.split("/");
      return urlParts[urlParts.length - 1];
    };

    const id = getIdFromUrl();
    setThreadId(id);

    const localData = localStorage.getItem(key);

    if (localData) {
      try {
        const parsedArray = JSON.parse(localData) as Data[];
        const threadData = parsedArray.find((thread) => thread.id === id);

        if (threadData) {
          setData({ ...threadData, comments: threadData.comments || [] });
        } else {
          console.error("Thread not found.");
        }
      } catch (error) {
        console.error("Failed to parse data from localStorage", error);
      }
    }
  }, []);

  const currentUser = JSON.parse(localStorage.getItem('User') || 'null');

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleReplyChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReply({ ...newReply, [index]: e.target.value });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      alert('You must be logged in to comment.');
      return;
    }

    if (newComment.trim() === "") return;

    const updatedComments: Comment[] = [
      ...data.comments,
      { content: newComment, creator: currentUser.userName, replies: [], isAnswer: false }, // Initialize isAnswer as false
    ];

    const updatedData = {
      ...data,
      comments: updatedComments,
    };

    const localData = localStorage.getItem(key);

    if (localData) {
      try {
        const parsedArray = JSON.parse(localData) as Data[];
        const threadIndex = parsedArray.findIndex(
          (thread) => thread.id === threadId
        );

        if (threadIndex !== -1) {
          parsedArray[threadIndex] = updatedData;
          localStorage.setItem(key, JSON.stringify(parsedArray));
        } else {
          console.error("Thread not found during update.");
        }
      } catch (error) {
        console.error("Failed to update data in localStorage", error);
      }
    }

    setData(updatedData);
    setNewComment("");
  };

  const handleReplySubmit = (index: number, e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      alert('You must be logged in to reply.');
      return;
    }

    if (newReply[index]?.trim() === "") return;

    const updatedComments = data.comments.map((comment, commentIndex) => {
      if (commentIndex === index) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []), // Ensure replies is an array
            { content: newReply[index], creator: currentUser.userName },
          ],
        };
      }
      return comment;
    });

    const updatedData = {
      ...data,
      comments: updatedComments,
    };

    const localData = localStorage.getItem(key);

    if (localData) {
      try {
        const parsedArray = JSON.parse(localData) as Data[];
        const threadIndex = parsedArray.findIndex(
          (thread) => thread.id === threadId
        );

        if (threadIndex !== -1) {
          parsedArray[threadIndex] = updatedData;
          localStorage.setItem(key, JSON.stringify(parsedArray));
        } else {
          console.error("Thread not found during update.");
        }
      } catch (error) {
        console.error("Failed to update data in localStorage", error);
      }
    }

    setData(updatedData);
    setNewReply({ ...newReply, [index]: "" });
  };

  const handleEditThread = (field: string, value: string) => {
    const updatedData = { ...data, [field]: value };

    const localData = localStorage.getItem(key);

    if (localData) {
      try {
        const parsedArray = JSON.parse(localData) as Data[];
        const threadIndex = parsedArray.findIndex(
          (thread) => thread.id === threadId
        );

        if (threadIndex !== -1) {
          parsedArray[threadIndex] = updatedData;
          localStorage.setItem(key, JSON.stringify(parsedArray));
        } else {
          console.error("Thread not found during update.");
        }
      } catch (error) {
        console.error("Failed to update data in localStorage", error);
      }
    }

    setData(updatedData);
  };

  const handleDeleteThread = () => {
    const localData = localStorage.getItem(key);

    if (localData) {
      try {
        const parsedArray = JSON.parse(localData) as Data[];
        const updatedArray = parsedArray.filter((thread) => thread.id !== threadId);

        localStorage.setItem(key, JSON.stringify(updatedArray));
        router.push('/'); // Redirect to home page after deletion
      } catch (error) {
        console.error("Failed to delete thread from localStorage", error);
      }
    }
  };

  const handleRemoveComment = (index: number) => {
    const updatedComments = data.comments.filter((_, commentIndex) => commentIndex !== index);

    const updatedData = { ...data, comments: updatedComments };

    const localData = localStorage.getItem(key);

    if (localData) {
      try {
        const parsedArray = JSON.parse(localData) as Data[];
        const threadIndex = parsedArray.findIndex(
          (thread) => thread.id === threadId
        );

        if (threadIndex !== -1) {
          parsedArray[threadIndex] = updatedData;
          localStorage.setItem(key, JSON.stringify(parsedArray));
        } else {
          console.error("Thread not found during update.");
        }
      } catch (error) {
        console.error("Failed to update data in localStorage", error);
      }
    }

    setData(updatedData);
  };
  const handleMarkAsAnswer = (index: number) => {
    const updatedComments = data.comments.map((comment, commentIndex) => {
      if (commentIndex === index) {
        return { ...comment, isAnswer: !comment.isAnswer };
      }
      return comment;
    });
  
    const updatedData = { ...data, comments: updatedComments };
  
    const localData = localStorage.getItem(key);
  
    if (localData) {
      try {
        const parsedArray = JSON.parse(localData) as Data[];
        const threadIndex = parsedArray.findIndex(
          (thread) => thread.id === threadId
        );
  
        if (threadIndex !== -1) {
          parsedArray[threadIndex] = updatedData;
          localStorage.setItem(key, JSON.stringify(parsedArray));
        } else {
          console.error("Thread not found during update.");
        }
      } catch (error) {
        console.error("Failed to update data in localStorage", error);
      }
    }
  
    setData(updatedData);
  };
  const handleCategoryChange = (value: string) => {
    if (value !== 'QNA') {
      const updatedComments = data.comments.map((comment) => ({
        ...comment,
        isAnswer: false,
      }));

      const updatedData = { ...data, comments: updatedComments, category: value };

      const localData = localStorage.getItem(key);

      if (localData) {
        try {
          const parsedArray = JSON.parse(localData) as Data[];
          const threadIndex = parsedArray.findIndex(
            (thread) => thread.id === threadId
          );

          if (threadIndex !== -1) {
            parsedArray[threadIndex] = updatedData;
            localStorage.setItem(key, JSON.stringify(parsedArray));
          } else {
            console.error("Thread not found during update.");
          }
        } catch (error) {
          console.error("Failed to update data in localStorage", error);
        }
      }

      setData(updatedData);
    } else {
      handleEditThread('category', value);
    }
    // setIsCategoryDropdownVisible(true); // Close the category dropdown after selecting a category
  };

  const showCategoryDropdown = () => {
    setIsCategoryDropdownVisible;
  };

  const isThreadOwnerOrModerator = currentUser?.userName === data.creator || currentUser?.isModerator;

  return (
    <div>
      <Navbar />
      <div className='d-thread'>
        <div className="d-thread-container">
          {isThreadOwnerOrModerator && (
            <div className="d-thread-container-top-buttons" onClick={toggleModeratorButtons}>⚙️
              {isDropdownVisible && (
                <>
                  <button className="Edit-Title" onClick={() => handleEditThread('title', prompt('Edit Title', data.title) || data.title)}>Edit Title</button>
                  <button className='Edit-Description' onClick={() => handleEditThread('description', prompt('Edit Description', data.description) || data.description)}>Edit Description</button>
                  {isCategoryDropdownVisible && (
                    <div className="category-dropdown">
                      <Select onValueChange={handleCategoryChange}>
                        <SelectTrigger className='Category-Edit'>
                          <SelectValue placeholder="Edit Category" />
                        </SelectTrigger>
                        <SelectContent className='Select-Category'>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        <div className="d-thread-container-top">
          <div className="d-thread-container-top-width">
            <span className='d-thread-poster'>{data.creator}</span>
            <span className='Bad-words'>Inappropriate words: poop, shit, ugly </span>
            <span className='d-thread-category'>{data.category}</span>
            {(data.creator === currentUser?.userName || currentUser?.isModerator) && (
              <>
                <button className='Delete-Thread' onClick={handleDeleteThread}>X<span className='tooltip-text'>Delete Thread</span></button>
              </>
            )}
          </div>
          <h2 className='d-thread-title'>{data.title}</h2>
        </div>
        <div className="d-thread-container-center">
          <p className='d-thread-text'>
            {data.description}
          </p>
        </div>


        {currentUser && !data.locked ? (
          <div className="d-thread-container-create-comment">

            <form onSubmit={handleCommentSubmit} className='d-thread-container-create-comment'>
              <div className="d-thread-container-create-comment-input">
                <label htmlFor="commentField" className='d-thread-label'>Write a comment</label>
                <input type="text" value={newComment} onChange={handleCommentChange} id='commentField' />
              </div>
              <div className="d-thread-container-create-comment-btn">
                <button type='submit' id='postCommentBtn'>Post</button>
              </div>
            </form>

          </div>
        ) : (
          <p>{data.locked ? 'This thread is locked and cannot be commented on.' : 'You must be logged in to comment.'}</p>
        )}


          <div className="d-thread-container-bottom">
            <h3 id='commentLabel'>Comments</h3>
            {data.comments.map((comment, index) => (
              <div key={index} className="d-thread-container-bottom-comment">
                <span className='comment-name'>{comment.creator}</span>
                <p className='comment-text'>
                  {containsInappropriateLanguage(comment.content) ? censorText(comment.content) : comment.content}
                </p>
                {(data.creator === currentUser?.userName || currentUser?.isModerator) && (
                  <button className='Delete-Comment' onClick={() => handleRemoveComment(index)}>X</button>
                )}
                {data.category === 'QNA' && data.creator === currentUser?.userName && !comment.isAnswer && (
                  <button className="answer-badge" onClick={() => handleMarkAsAnswer(index)}>Mark as Answer</button>
                )}
                {comment.isAnswer && <span className='answer-badge'>Answer</span>}
                <div className="d-thread-container-bottom-replies">
                  {comment.replies && comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className="d-thread-container-bottom-reply">
                      <span className='reply-name'>{reply.creator}</span>
                      <p className='reply-text'>
                        {containsInappropriateLanguage(reply.content) ? censorText(reply.content) : reply.content}
                      </p>
                    </div>
                  ))}
                  {currentUser && !data.locked && (
                    <form onSubmit={(e) => handleReplySubmit(index, e)} className='d-thread-container-create-reply'>
                      <div className="d-thread-container-create-reply-input">
                        <label htmlFor={`replyField-${index}`} className='d-thread-label'>Comment:</label>
                        <input
                          type="text"
                          value={newReply[index] || ""}
                          onChange={(e) => handleReplyChange(index, e)}
                          id={`replyField-${index}`}
                        />
                      </div>
                      <div className="d-thread-container-create-reply-btn">
                        <button type='submit' id='postReplyBtn'>Post</button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  </div>
  );
};

export default Thread;