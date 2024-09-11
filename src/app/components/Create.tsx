'use client'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { validate } from './validate'
import { Modal } from '../components/Modal'

export const Create = () => {
  const [form, setForm] = useState({ title: '', description: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<ErrorForm>({
    title: '',
    description: '',
    selection: ''
  });
  const [selection, setSelection] = useState<ThreadCategory | string>('');
  const router = useRouter();

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate(form, selection, setError)) {
      return;
    }

    try {
      const storedUser = localStorage.getItem('User');
      if (!storedUser) {
        setIsModalOpen(true); // Show modal if user is not logged in
        return;
      }

      // Parse the string to convert it into a User object
      const user: User = JSON.parse(storedUser);
      const userName = user.userName;

      const newSubject: Thread = {
        id: crypto.randomUUID(),
        creator: userName,
        category: selection as ThreadCategory,
        title: form.title,
        description: form.description,
        creationDate: new Date(),
      };

      const oldStorage = localStorage.getItem('forum/threads');
      let allThreads = oldStorage ? JSON.parse(oldStorage) : [];

      allThreads.push(newSubject);
      localStorage.setItem('forum/threads', JSON.stringify(allThreads));

      router.push('/');
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  }

  return (
    <div className='c-thread-create'>
    <form onSubmit={onSubmit} className='form-container'>
      <div className='my-5'>
        <label className='form-label' htmlFor="">Title</label>
        <input
          value={form.title}
          name='title'
          placeholder='Title'
          onChange={onChangeHandler}
          className='form-input'
        />
      </div>
  
      <label className='form-label'>Thread/QNA</label>
      <select onChange={e => setSelection(e.target.value)} className='form-select'>
        <option value="" disabled selected>select</option>
        <option value="THREAD">THREAD</option>
        <option value="QNA">QNA</option>
      </select>
  
      <div className='my-5'>
        <label className='form-label'>Description</label>
        <textarea
          value={form.description}
          name='description'
          onChange={onChangeHandler}
          className='form-textarea'
        />
      </div>
  
      <button type='submit' className='form-button'>Submit</button>
  
      {error.title && <p className='error-message'>{error.title}</p>}
      {error.selection && <p className='error-message'>{error.selection}</p>}
      {error.description && <p className='error-message'>{error.description}</p>}
    </form>
    <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        message="You must be logged in to create a thread." 
      />
  </div>
  )
}
