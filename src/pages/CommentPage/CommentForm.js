import React, { useState } from 'react';
import Label from '../../components/Label';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import toast from 'react-hot-toast';

const CommentForm = (props) => {
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);

        if(!comment) {
            toast.error("The comment field is required.");
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            return;
        }

        toast.success("Comment created successfully, we will review and publish it soon.");
        
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        setComment('');
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="form-group">
                    <Label htmlFor="comment">Leave a Comment</Label>
                    <Textarea 
                        name="comment"
                        rows="4" 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <Button processing={isLoading}>Submit</Button>
                </div>
            </form>
        </>
    )
}

export default CommentForm;
