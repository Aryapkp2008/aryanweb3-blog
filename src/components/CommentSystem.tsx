'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  ThumbsUp, 
  Reply, 
  MoreVertical,
  Edit2,
  Trash2,
  Flag,
  User
} from 'lucide-react';
import { format } from 'date-fns';

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: Date;
  likes: number;
  userLiked?: boolean;
  replies: Comment[];
  edited?: boolean;
  editedAt?: Date;
}

interface CommentSystemProps {
  postId: string;
}

export default function CommentSystem({ postId }: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [userName, setUserName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [isLoading, setIsLoading] = useState(false);

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${postId}`);
    if (savedComments) {
      const parsed = JSON.parse(savedComments);
      // Convert timestamp strings back to Date objects
      const convertDates = (comment: any): Comment => ({
        ...comment,
        timestamp: new Date(comment.timestamp),
        editedAt: comment.editedAt ? new Date(comment.editedAt) : undefined,
        replies: comment.replies ? comment.replies.map(convertDates) : []
      });
      setComments(parsed.map(convertDates));
    }

    // Load saved username
    const savedName = localStorage.getItem('commenter-name');
    if (savedName) {
      setUserName(savedName);
    }
  }, [postId]);

  // Save comments to localStorage
  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  // Sort comments
  const getSortedComments = () => {
    const sorted = [...comments];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      case 'oldest':
        return sorted.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      case 'popular':
        return sorted.sort((a, b) => b.likes - a.likes);
      default:
        return sorted;
    }
  };

  // Add comment
  const handleAddComment = (content: string, parentId?: string) => {
    if (!content.trim()) return;
    
    if (!userName) {
      setShowNamePrompt(true);
      return;
    }

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: userName,
      content: content.trim(),
      timestamp: new Date(),
      likes: 0,
      userLiked: false,
      replies: []
    };

    if (parentId) {
      // Add as reply
      const addReply = (comments: Comment[]): Comment[] => {
        return comments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...comment.replies, newCommentObj]
            };
          }
          return {
            ...comment,
            replies: addReply(comment.replies)
          };
        });
      };
      saveComments(addReply(comments));
      setReplyTo(null);
    } else {
      // Add as top-level comment
      saveComments([newCommentObj, ...comments]);
    }

    setNewComment('');
  };

  // Edit comment
  const handleEditComment = (commentId: string, newContent: string) => {
    const updateComment = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content: newContent,
            edited: true,
            editedAt: new Date()
          };
        }
        return {
          ...comment,
          replies: updateComment(comment.replies)
        };
      });
    };
    
    saveComments(updateComment(comments));
    setEditingId(null);
    setEditContent('');
  };

  // Delete comment
  const handleDeleteComment = (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    const deleteComment = (comments: Comment[]): Comment[] => {
      return comments
        .filter(comment => comment.id !== commentId)
        .map(comment => ({
          ...comment,
          replies: deleteComment(comment.replies)
        }));
    };
    
    saveComments(deleteComment(comments));
  };

  // Toggle like
  const handleToggleLike = (commentId: string) => {
    const toggleLike = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
            userLiked: !comment.userLiked
          };
        }
        return {
          ...comment,
          replies: toggleLike(comment.replies)
        };
      });
    };
    
    saveComments(toggleLike(comments));
  };

  // Render comment component
  const CommentComponent = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const [showActions, setShowActions] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const isEditing = editingId === comment.id;
    const isReplying = replyTo === comment.id;

    return (
      <div className={`${depth > 0 ? 'ml-12 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''} mb-4`}>
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-medium">
            {comment.avatar ? (
              <img src={comment.avatar} alt={comment.author} className="w-full h-full rounded-full" />
            ) : (
              comment.author[0].toUpperCase()
            )}
          </div>

          {/* Comment Content */}
          <div className="flex-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {format(comment.timestamp, 'MMM d, yyyy • h:mm a')}
                  </span>
                  {comment.edited && (
                    <span className="text-xs text-gray-400 italic">
                      (edited)
                    </span>
                  )}
                </div>
                
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded relative"
                >
                  <MoreVertical className="w-4 h-4" />
                  
                  {showActions && (
                    <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10">
                      {comment.author === userName && (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(comment.id);
                              setEditContent(comment.content);
                              setShowActions(false);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                          >
                            <Edit2 className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteComment(comment.id);
                              setShowActions(false);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setShowActions(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        <Flag className="w-3 h-3" />
                        Report
                      </button>
                    </div>
                  )}
                </button>
              </div>

              {/* Content */}
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditComment(comment.id, editContent)}
                      className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditContent('');
                      }}
                      className="px-3 py-1 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {comment.content}
                </p>
              )}

              {/* Actions */}
              {!isEditing && (
                <div className="flex items-center gap-4 mt-3">
                  <button
                    onClick={() => handleToggleLike(comment.id)}
                    className={`flex items-center gap-1 text-sm ${
                      comment.userLiked ? 'text-purple-600' : 'text-gray-500 hover:text-purple-600'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" fill={comment.userLiked ? 'currentColor' : 'none'} />
                    <span>{comment.likes || ''}</span>
                  </button>
                  
                  {depth < 3 && (
                    <button
                      onClick={() => setReplyTo(isReplying ? null : comment.id)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600"
                    >
                      <Reply className="w-4 h-4" />
                      Reply
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Reply Input */}
            {isReplying && (
              <div className="mt-3 ml-12">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAddComment(replyContent, comment.id);
                        setReplyContent('');
                      }
                    }}
                    placeholder="Write a reply..."
                    className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  />
                  <button
                    onClick={() => {
                      handleAddComment(replyContent, comment.id);
                      setReplyContent('');
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Nested Replies */}
            {comment.replies.length > 0 && (
              <div className="mt-4">
                {comment.replies.map(reply => (
                  <CommentComponent key={reply.id} comment={reply} depth={depth + 1} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          Comments ({comments.length})
        </h3>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-1 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Name Prompt Modal */}
      {showNamePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <h4 className="text-lg font-semibold mb-4">What's your name?</h4>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 mb-4"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  setUserName(e.currentTarget.value);
                  localStorage.setItem('commenter-name', e.currentTarget.value);
                  setShowNamePrompt(false);
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = (e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement);
                if (input?.value) {
                  setUserName(input.value);
                  localStorage.setItem('commenter-name', input.value);
                  setShowNamePrompt(false);
                }
              }}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Comment Input */}
      <div className="mb-8">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-medium">
            {userName ? userName[0].toUpperCase() : <User className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={userName ? "Share your thoughts..." : "Click to add your name and comment..."}
              onClick={() => !userName && setShowNamePrompt(true)}
              className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 resize-none"
              rows={3}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">
                Markdown supported • Be respectful
              </div>
              <button
                onClick={() => handleAddComment(newComment)}
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {getSortedComments().length > 0 ? (
          getSortedComments().map(comment => (
            <CommentComponent key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}