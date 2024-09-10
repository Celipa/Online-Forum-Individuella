import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const LandingPage = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getData = () => {
      let threads = JSON.parse(localStorage.getItem("forum/threads") || "[]") || [];
      if (!Array.isArray(threads)) {
        threads = [];
      }
      console.log("getting threads", threads);
      setThreads(threads);
      console.log(threads);
    };

    getData();
  }, []);

  const handleNavigation = (id: string) => {
    router.push('/thread/' + id);
  };

  const handleLockThread = (id: string) => {
    const currentUser = JSON.parse(localStorage.getItem('User') || '{}');
    const updatedThreads = threads.map(thread => 
      thread.id === id && thread.creator === currentUser.userName ? { ...thread, locked: !thread.locked } : thread
    );
    setThreads(updatedThreads);
    localStorage.setItem('forum/threads', JSON.stringify(updatedThreads));
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem('User');
  };

  return (
    <div>
      <div className='thread-home'>
        <h1 className='Thread-Header-Title'>Threads</h1>
        <div className='thread-container-home'>
          <button className='Create-Thread-Btn' onClick={() => router.push('/create')}>Create Thread</button>
          <div className="thread-container-top-home">
            {threads.map((thread, index) => (
              <div onClick={() => handleNavigation(thread.id)} className='threadbox' key={`${thread.id}-${index}`}>
                <p className='category'>{thread.category}</p>
                <p className='Creator'>{thread.creator}</p>
                <h2>{thread.title}</h2>
                <div className='thread-text-home'>
                  <p className="ellipsis">{thread.description}</p>
                </div>
                <ul className='CreationDate'>
                  <li className='Date'>{new Date(thread.creationDate).toLocaleDateString()}</li>
                  <li className='Time'>{new Date(thread.creationDate).toLocaleTimeString()}</li>
                </ul>
                {isLoggedIn() && JSON.parse(localStorage.getItem('User') || '{}').userName === thread.creator && (
                  <button onClick={(e) => { e.stopPropagation(); handleLockThread(thread.id); }}>
                    {thread.locked ? 'Unlock Thread' : 'Lock Thread'}
                  </button>
                )}
                {thread.locked && <p className='locked'>This thread is locked</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;