import React, { useState } from 'react';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import toast from 'react-hot-toast';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if(!name || !email || !subject || !message) {
            toast.error("All fields are required.");
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            return;
        } 
        
        toast.success("Thank you for contacting us, we will reply you soon.");
        
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Contact Us</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        name="message"
                                        id="message"
                                        rows="4"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Button processing={isLoading}>Send</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;
